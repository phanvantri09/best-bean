$('select.custom-select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    // $this.addClass('select-hidden'); 
    return
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
        if ($this.children('option').eq(i).is(':selected')){
          $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
        }
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        var selectedValue = $(this).attr('rel');
        $this.val(selectedValue).change(); 
        $list.find('li.is-selected').removeClass('is-selected');
        $(this).addClass('is-selected');
        $list.hide();

        var $select = $('#FacetsWrapperDesktop select[name="sort_by"]');
    
        // Set the value of the native select to the selected value and trigger the change event.
        $select.val(selectedValue).change();
        $(`#SortBy`).click()
        $(`#SortBy option[name="${selectedValue}"]`).click()

        // $('#SortBy').val(selectedValue).change();
        // Log to confirm the value was set
        console.log("Native select value set to: ",selectedValue, $select.val(),$select);
    });
    $this.on('change', function() {
        console.log('Giá trị đã thay đổi thành: ' + $(this).val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});