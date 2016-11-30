(function() {
  'use strict';

  var concurrentConfig = {
    ionic: {
      tasks: [],
      options: {
        logConcurrentOutput: true
      }
    },
    server: [
      'compass:server',
      'copy:styles',
      'copy:vendor',
      'copy:fonts',
      'jade'
    ],
    test: [
      'compass',
      'copy:styles',
      'copy:vendor',
      'copy:fonts',
      'jade:test'
    ],
    dist: [
      'compass:dist',
      'copy:styles',
      'copy:vendor',
      'copy:fonts',
      'jade'
    ],
    staging: [
      'compass:staging',
      'copy:styles',
      'copy:vendor',
      'copy:fonts',
      'jade:staging'
    ]
  };

  return module.exports = concurrentConfig;
})();
