module.exports = function(grunt) {

  // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js'],
      options: {
        "curly": true,
        "eqeqeq": true,
        "undef": true,
        "globals": {
          jQuery: true
        }
      }
    },
    uglify: {
      my_target: {
          files: {
              '_/js/script.js': ['_/components/js/*.js'] //compresses and combine multiple js files
          } //files
      } //my_target
    }, //uglify
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.registerTask('default', ['jshint']);

};