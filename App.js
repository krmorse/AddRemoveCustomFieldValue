Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        Rally.data.wsapi.ModelFactory.getModels({
          types: ['userstory', 'attributedefinition', 'allowedattributevalue']
        }).then({
          success: this._createField,
          scope: this
        });
    },

    _createField: function(models) {
        this.models = models;

        //hack to make required fields persistable
        _.each(['AttributeType', 'RealAttributeType', 'Constrained', 'TypeDefinition'], function(fieldName) {
          this.models.attributedefinition.getField(fieldName).persist = true;
        }, this);
        //end hack

        var newField = Ext.create(this.models.attributedefinition, {
          AttributeType: 'STRING',
          RealAttributeType: 'DROP_DOWN',
          Constrained: true,
          Custom: true,
          Filterable: true,
          Sortable: true,
          Name: 'MyDropdownField',
          TypeDefinition: this.models.userstory.typeDefinition._ref
        });
        newField.save().then({
          success: this._createValue,
          scope: this
        });
    },

    _createValue: function(field) {
      var newValue = Ext.create(this.models.allowedattributevalue, {
        StringValue: 'D',
        ValueIndex: 0,
        AttributeDefinition: Rally.util.Ref.getRelativeUri(field)
      });
      newValue.save().then({
        success: function() {
          console.log('winning');
        },
        scope: this
      });
    }
});
