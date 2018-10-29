(function() {

  var rawVars = location.hash.replace('#', '').split(',');
  var vars = {
    n: parseInt(rawVars[0]) || 10,
    r: rawVars[1] || '0',
    g: rawVars[2] || 'xy',
    b: rawVars[3] || '1',
    currentVar: rawVars[4] || 'n'
  };

  var rgb = function(v, x, y, xy) {
    return {
      '0': 0,
      '1': 255,
      'x': ((x / (vars.n + 1)) * 255),
      'y': ((y / (vars.n + 1)) * 255),
      'xy': ((xy / (vars.n + 1)) * 255)
    }[vars[v]];
  };

  for (var y = 0; y <= vars.n; y++) {
    document.write('<div class="row" style="height: ' + (100 / (vars.n + 1)) + '%;">');
    for (var x = 0; x <= vars.n; x++) {
      var xy = (x * y) % vars.n;
      document.write('<div class="cell" style="width: ' + (100 / (vars.n + 1)) +
                     '%; background-color: rgb(' +
                     rgb('r', x, y, xy) + ', ' +
                     rgb('g', x, y, xy) + ', ' +
                     rgb('b', x, y, xy) + ');">' +
                     xy + '</div>');
    }
    document.write('</div>');
  }

  window.addEventListener('hashchange', function() {
    location.reload();
  }, false);

  var selectVar = function(v) {
    vars.currentVar = v;
    incVar();
    setVars();
  };

  var incVar = function() {
    if (vars.currentVar === 'n') {
      vars[vars.currentVar]++;
    } else {
      var values = ['0', '1', 'x', 'y', 'xy'];
      vars[vars.currentVar] = values[(values.indexOf(vars[vars.currentVar]) + 1) % 5];
    }
  };

  var decVar = function() {
    if (vars.currentVar === 'n') {
      vars[vars.currentVar]--;
    } else {
      var values = ['0', '1', 'x', 'y', 'xy'];
      vars[vars.currentVar] = values[(values.indexOf(vars[vars.currentVar]) + 4) % 5];
    }
  };

  var setVars = function() {
    location.hash = ['n', 'r', 'g', 'b', 'currentVar'].map(function(v) { return vars[v] }).join(',');
  };

  window.addEventListener('keyup', function(e) {
    switch (e.key) {
    case 'r':
      selectVar('r');
      break;
    case 'b':
      selectVar('b');
      break;
    case 'g':
      selectVar('g');
      break;
    case 'n':
      selectVar('n');
      break;
    case 'ArrowUp':
    case 'ArrowRight':
      incVar();
      setVars();
      break;
    case 'ArrowDown':
    case 'ArrowLeft':
      decVar();
      setVars();
      break;
    }
  }, false);

})();
