var b = s = null,
    u = p = 0;

var f = [
    [new Date(2016, 2, 29), 'fsmosophica.org', 'Katastrophe ausgehend von Mitteleuropa'],
    [new Date(2016, 4, 16), 'Ricardo Salazar', 'Asteroid'],
    [new Date(2016, 7, 8), 'James Hansen', 'Gletscherschmelze, Flut'],
    [new Date(2018, 5, 4), 'Nostradamus', 'Atomkrieg'],
];
var fref = (f[f.length - 1][0]).getTime() + 86400000 * 180;

function zpd(n) { return (parseInt(n) < 10 ? "0" + n : n); }
function tmp(d) { return Math.floor((d - (new Date()).getTime()) / 1000); }
function prc(t, r) { return Math.ceil(Math.abs(t) / ((r || 86400) / 100)); }
function nrm(p) { return Math.floor(p / (Math.floor(p / 100) + 1)); }

function hms(n) {
    var h, m = Math.floor((n - ((h = Math.floor(n / 3600)) * 3600)) / 60);
    return h + 'h ' + zpd(m) + 'm ' + zpd(n - (h * 3600) - (m * 60)) + 's';
}

function ymd(d) { return zpd(d.getDate()) + "." + zpd(d.getMonth() + 1) + "." + d.getFullYear(); }

$(function() {
    b = $('div.progress-main');
    u = f[0][0].getTime();

    var fe = $('<p>');
    var fee = $('<div>').addClass('progress progress-warning progress-striped active');
    var feee = $('<div>').addClass('bar');
    var ft = $('aside#upcoming');
    $(f).each(function(i, e) {
        ft.append($(fe).clone().html('"' + e[2] + '"<br>am ' + ymd(e[0]) + ' - ' + e[1]).append($(fee).clone().append($(feee).clone().attr({id: 'up-' + e[0].getTime()}))));
    });

    window.setInterval(function() {
        $('aside#upcoming .progress .bar').each(function(i, e) {
            $(e).width(prc(tmp(parseInt($(e).attr('id').replace(/^up-/, ''))), tmp(fref)) + '%');
        });

        var t, c;
        if ((c = nrm(prc(t = tmp(u)))) != p) {
            if (s = b.find((36 < (p = c) ? '.bar' : 'span'))) s.text('');
            b.addClass('progress-striped progress-' + (t < 0 ? 'success' : 'danger')).find('.bar').width(c + '%');
        }
        s.text((t < 0 ? ($(window).width() < 580 ? '' : 'Glückwunsch! ') + 'Du überlebst seit ' : 'Nächster Weltuntergang in T - ') + hms(Math.abs(t)));
    }, 1000);
});
