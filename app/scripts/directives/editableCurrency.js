'use strict';

angular.module('xeditable')
  .directive('editableCurrency', ['editableDirectiveFactory', function (editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableCurrency',
      inputTpl: '<input type="number" class="input-mini">',
      render: function() {
        this.parent.render.call(this);
        this.inputEl.wrap('<div class="input-prepend"></div>');
        this.inputEl.before('<span class="add-on"> $ </span>');
      }
    });
  }]);
