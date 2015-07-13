'use strict';

var path = require('canonical-path');
var Package = require('dgeni').Package;

var ngdoc = require('dgeni-packages/ngdoc');

var getVersion = require('./services/getVersion');
var gitData = require('./services/gitData');
var deployment = require('./services/deployments/production');
var type = require('./inline-tag-defs/type');

var indexPageProcessor = require('./processors/index-page');
var keywordProcessor = require('./processors/keywords');
var pagesDataProcessor = require('./processors/pages-data');

module.exports = new Package('scaffolding', [ngdoc])

  .factory(getVersion.name, getVersion)
  .factory(gitData.name, gitData)
  .factory(deployment.name, deployment)
  .factory(type.name, type)

  .processor(indexPageProcessor.name, indexPageProcessor)
  .processor(keywordProcessor.name, keywordProcessor)
  .processor(pagesDataProcessor.name, pagesDataProcessor)

  .config(function (dgeni) {
    dgeni.stopOnValidationError = true;
    dgeni.stopOnProcessingError = true;
  })

  .config(function (inlineTagProcessor, typeInlineTagDef) {
    inlineTagProcessor.inlineTagDefinitions.push(typeInlineTagDef);
  })

  .config(function (templateFinder, renderDocsProcessor, gitData) {
    templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));
    renderDocsProcessor.extraData.git = gitData;
  })

  .config(function (computePathsProcessor, computeIdsProcessor) {
    computePathsProcessor.pathTemplates.push({
      docTypes: ['overview'],
      getPath: function (doc) {
        var docPath = path.dirname(doc.fileInfo.relativePath);
        if (doc.fileInfo.baseName !== 'index') {
          docPath = path.join(docPath, doc.fileInfo.baseName);
        }
        return docPath;
      },
      outputPathTemplate: 'partials/${path}.html'
    });

    computePathsProcessor.pathTemplates.push({
      docTypes: ['indexPage'],
      pathTemplate: '.',
      outputPathTemplate: '${id}.html'
    });

    computePathsProcessor.pathTemplates.push({
      docTypes: ['module'],
      pathTemplate: '${area}/${name}',
      outputPathTemplate: 'partials/${area}/${name}.html'
    });
    computePathsProcessor.pathTemplates.push({
      docTypes: ['componentGroup'],
      pathTemplate: '${area}/${moduleName}/${groupType}',
      outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
    });

    computeIdsProcessor.idTemplates.push({
      docTypes: ['overview', 'indexPage'],
      getId: function (doc) {
        return doc.fileInfo.baseName;
      },
      getAliases: function (doc) {
        return [doc.id];
      }
    });
  })

  .config(function (checkAnchorLinksProcessor) {
    checkAnchorLinksProcessor.base = '/';
    // We are only interested in docs that have an area (i.e. they are pages)
    checkAnchorLinksProcessor.checkDoc = function (doc) {
      return doc.area;
    };
  })

  .config(function (generateIndexPagesProcessor, productionDeployment) {
    generateIndexPagesProcessor.deployments = [
      productionDeployment
    ];
  })

  .config(function (aliasMap) {
    var ngApi = require('./aliases/ng-aliases').api;

    ngApi.navGroups.forEach(function (group) {
      group.navItems.forEach(function (item) {
        if (item.type === 'section') return;

        aliasMap.addDoc({
          aliases: [item.name],
          module: group.name,
          name: item.name,
          path: ngApi.baseHref + item.href
        });
      });
    });
  })

  .config(function (aliasMap) {
    var uiApi = require('./aliases/ui-aliases');

    uiApi.pages.forEach(function (page) {
      if (page.section !== 'api') return;

      aliasMap.addDoc({
        aliases: [page.id],
        module: page.moduleName,
        name: page.shortName,
        path: uiApi.baseHref + page.id
      });
    });
  });
