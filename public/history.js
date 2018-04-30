$(document).ready(function() {


    $('body ').on('click', 'table tbody tr td a.pay', function() {
        var account_id = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: '/payments/pay/'+account_id,
            success: (res) => {
                if(res) {
                    alert('Payment Unsuccessful. See Node Console')
                } else {
                    alert('Paid');
                    $(this).parent().html('Paid')
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    })
});