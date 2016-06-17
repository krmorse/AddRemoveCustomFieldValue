Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        Rally.data.wsapi.ModelFactory.getModels({
          types: ['userstory', 'allowedattributevalue']
        }).then({
          success: function(models) {
            var field = models.userstory.getField('c_KanbanState');
            var newValue = Ext.create(models.allowedattributevalue, {
              StringValue: 'D',
              ValueIndex: 0,
              AttributeDefinition: Rally.util.Ref.getRelativeUri(field.attributeDefinition)
            });
            newValue.save().then({
              success: function() {
                console.log(arguments);
              },
              scope: this
            });
          },
          scope: this
        });
    }
});
