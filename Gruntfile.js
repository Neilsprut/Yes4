module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  // require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assemble: {
      options: {
        layout: "src/layout/default.hbs",
        partials: "src/partials/*.hbs",
        flatten: true,
        prettify: {
          indent: 2
        }
      },
      pages: {
        files: {
          './': ['src/pages/*.hbs']
        }
      }
    },
    jshint: {
      files: ['src/js/*.js'],
      options: {
        "browser": true,
        "esnext": true,
        "force": true,
        "globals": {
          "console": false,
          "$": true
        },
        "strict": "global",
        "undef": true,
        "unused": true,
      }
    },
    sass: {
      pretty: {
        src: ['src/sass/style.scss'],
        dest: 'css/style.css'
      },
      minify: {
        options: {
          style: 'compressed'
        },
        src: ['src/sass/style.scss'],
        dest: 'css/style.css'
      }
    },
    uglify: {
      options: {
        mangle: false,
        beautify: {
          width: 80,
          beautify: true
        }
      },
      my_target: {
        files: {
          'js/script.js': ['src/js/*.js']
        }
      }
    },
    purifycss: {
      options: {},
      target: {
        src: ['./index.html', 'vendor/js/*.js'],
        css: ['vendor/css/*.css'],
        dest: 'css/lib.min.css'
      },
    }
    // watch: {
    //   files: ['<%= jshint.files %>'],
    //   tasks: ['jshint']
    // }
  });

  grunt.registerTask('default', ['assemble', 'jshint', 'sass:minify', 'uglify:minify', 'purifycss']);

  grunt.registerTask('dev', ['assemble', 'jshint', 'sass:pretty', 'uglify', 'purifycss']);

  grunt.registerTask('css', ['sass:pretty']);

  grunt.registerTask('h', ['assemble']);

};
