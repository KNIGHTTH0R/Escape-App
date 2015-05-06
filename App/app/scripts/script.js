//SCRIPT JS  
'use strict';

      $('.collapse').collapse();


    $(function(){
        $('select[value]').each(function(){
            $(this).val(this.getAttribute('value'));
        });
    });

  
            $('#earliest_departure.input-group.date').datepicker({
                format: 'dd/mm/yyyy',
                startDate: 'today',
                endDate: '+6m',
                orientation: 'top left',
                todayHighlight: true
            });
            $('#latest_departure.input-group.date').datepicker({
                format: 'dd/mm/yyyy',
                startDate: 'today',
                endDate: '+90d',
                orientation: 'top left',
                todayHighlight: true
            });      


            var plus7days = new Date();
            plus7days.setDate(plus7days.getDate() + 7 );
            $('#earliest_departure').datepicker('setDate', plus7days);
            $('#earliest_departure').datepicker('update');
            $('#earliest_departure').val('');

            var plus21days = new Date();
            plus21days.setDate(plus21days.getDate() + 21 );
            $('#latest_departure').datepicker('setDate', plus21days);
            $('#latest_departure').datepicker('update');
            $('#latest_departure').val('');

            function matchStart (term, text) {
                if (text.toUpperCase().indexOf(term.toUpperCase()) === 0) {
                   return true;
                }
                return false;
            }
            

            $('.search-airport').select2({
                        placeholder: {
                        id: '-1',
                        text: 'DWF - Dallas Fort Worth Airport'
                    }
            });


            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })

