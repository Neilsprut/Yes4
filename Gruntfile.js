module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  // require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['src/js/*.js'],
      options: {
        "curly": true,
        "eqeqeq": true,
        "undef": true,
        "globals": {
          jQuery: true
        }
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
        compress: true
      },
      my_target: {
          files: {
              'js/script.js': ['src/js/*.js']
          }
      }
    }
    // watch: {
    //   files: ['<%= jshint.files %>'],
    //   tasks: ['jshint']
    // }
  });

  grunt.registerTask('default', ['jshint', 'sass', 'uglify']);

};