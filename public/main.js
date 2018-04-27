// $(document).ready(function() {
//     $('.delete-article').on('click', function(e) {
//         $target = $(e.target);
//         const id = $target.attr('data-id');
//         $.ajax({
//             type: 'DELETE',
//             url: '/article/'+id,
//             success: (response) => {
//                 alert('Deleting Article');
//                 window.location.href='/';
//             },
//             error: (err) => {
//                 console.log(err);
//             }
//         })
//     })
// });

$(document).ready(function() {

    var account_id = '1.2.874700';
    var endpoint = 'http://23.94.69.140:5000';
    var asset_id = '1.3.3030';
    var part1 = [];
    var part2 = [];

    recalculate();


    $('.btn-recalculate').on('click', function(e) {
        $('.table tbody').html(`<tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td style="text-align: right">&nbsp;</td>
                    <td style="text-align: right">&nbsp;</td>
                    <td style="text-align: right">&nbsp;</td>
                </tr>`);
        recalculate();
    });

    function recalculate() {
        $.ajax({
            type: 'GET',
            url: endpoint+'/full_account?account_id='+account_id,
            success: (res) => {
                console.log(res);
                var bodyObject = res; //JSON.parse(res);
                var balance = bodyObject[0][1].balances[0].balance / 10000;
                var five = balance * (5/100);
                var fees = balance * (3/100);
                var distribution_amount = balance - (2 * five) - fees;
                localStorage.setItem('balance', balance);
                localStorage.setItem('five', five);
                localStorage.setItem('fees', fees);
                localStorage.setItem('distribution_amount', distribution_amount);
                $('.five').html(five);
                $('.fees').html(fees);
                $('.distribution_amount').html(distribution_amount);
                $('.balance').html(balance);
            },
            error: (err) => {
                console.log(err);
            }
        });

        $.ajax({
            type: 'GET',
            url: endpoint+'/get_asset_holders?asset_id='+asset_id+'&start=0&limit=100',
            success: (res) => {
                //localStorage.setItem('part1', JSON.stringify(res));
                part1 = res;
                $.ajax({
                    type: 'GET',
                    url: endpoint+'/get_asset_holders?asset_id='+asset_id+'&start=100&limit=100',
                    success: (res) => {
                        //localStorage.setItem('part2', JSON.stringify(res));
                        part2 = res;
                        part = part1.concat(part2);
                        $('.holders_count').html(part.length);
                        localStorage.setItem('distribution', JSON.stringify(part));
                        CalculateAndAddRows(part);        
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
                        
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    function CalculateAndAddRows(distribution) {
        const distribution_amount = parseFloat(localStorage.getItem('distribution_amount'));

        const filtered = distribution.filter(({name}) => name !== 'paydporn1');

        let sum = filtered.reduce((t, r) => t + r.amount , 0);
        sum = sum / 1000;
        
        const refined = filtered.map( row => {
            let p = (row.amount / sum) * 100;
            p = p/1000;
            let pay = distribution_amount * (p/100);
            row['percent'] = p.toFixed(5);          
            row['payment'] = pay.toFixed(5);
            return row;
        });
        refined.forEach((row,i) => {
            $('.table tbody tr:last').after(`<tr>
                    <td>${i+1}</td>
                    <td>${row.account_id}</td>
                    <td>${row.name}</td>
                    <td style="text-align: right">${(row.amount/1000).toFixed(3)}</td>
                    <td style="text-align: right">${row.percent}</td>
                    <td style="text-align: right">${row.payment}</td>
                </tr>`);
        })
    }
});