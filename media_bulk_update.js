(function($) {

  Drupal.behaviors.media_bulk_update = {
    attach: function(context) {
      // Input types supported.
      var input_types = ["input", "textarea"];

      $(input_types).each(function(key, type) {
        // Append a button to each input type supported.
        $('.page-node-media-bulk-update ' + type + '[id^="edit-field"]', context).each(function() {
          $(this).css({'width': '87%'});

          var fieldContainerClassList = $(this).parents('.form-wrapper').attr('class');
          if (typeof fieldContainerClassList !== 'undefined' && fieldContainerClassList != '') {
            fieldContainerClassList = fieldContainerClassList.match(/field-name-([^\s]+)/);
            var fieldClass = fieldContainerClassList[0];

            // Add the button only to fields that have 'plain text' as format.
            var filter_format = $(this).parents(".text-format-wrapper").find(".filter-list").val();
            if (typeof (filter_format) == 'undefined' || filter_format == 'plain_text') {
              // Store the id of the source, so that we know where to copy the text from.
              // Store the class of the field, so we can update all instances of the same field.
              $(this).after('<button class="button-apply-all form-submit" data-source="#' +
                      this.id + '" data-dest=".' + fieldClass + '">' + Drupal.t('Copy to all') + '</button>');
            }
          }
        });
      });

      // Add listener on all buttons.
      $('.button-apply-all').bind('click', function(e) {
        // Prevent form submission.
        e.preventDefault();
        var source_selector = $(this).data().source;
        var dest_selector = $(this).data().dest;

        // Update each field.
        $(input_types).each(function(key, type) {
          $(dest_selector).find(type + '[id^="edit-field"').val($(source_selector).val()).fadeTo(100, 0.1);
        });
        //@TODO process Drupal.wysiwyg.instances

      });
    }
  };

})(jQuery);
