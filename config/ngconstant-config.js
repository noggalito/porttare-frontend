(function() {
  'use strict';

  var ngconstantConfig = {
    options: {
      space: '  ',
      wrap: '(function() {\n\n \'use strict\';\n\n {%= __ngModule %} \n\n })();',
      name: 'porttare.config',
      deps: false,
      dest: '<%= yeoman.app %>/<%= yeoman.scripts %>/config/constants-config.js'
    },
    development: {
      constants: {
        ENV: {
          name: 'development',
          apiHost: 'http://localhost:3785'
        }
      }
    },
    staging: {
      constants: {
        ENV: {
          name: 'staging',
          apiHost: 'https://porttare-backend.herokuapp.com',
          projectId: '57b74bad95ca4e060c00001b',
          projectKey: 'c27409281900a11da93818458b182608',
          airbrakeHost: 'https://pangi.shiriculapo.com'
        }
      }
    },
    production: {
      constants: {
        ENV: {
          name: 'production',
          apiHost: 'http://api.yoursite.com'
        }
      }
    },
    test: {
      constants: {
        ENV: {
          name: 'test',
          apiHost: 'http://porttare-integration.herokuapp.com'
        }
      }
    }
  };

  return module.exports = ngconstantConfig;
})();
