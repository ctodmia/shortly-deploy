module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      //
      dist: {
        src: [
          'lib/**/*.js',
          'server.js',
          'server-config.js'
        ],
        dest: 'build1/production.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      build: {
        src: 'build1/production.js',
        dest: 'build1/production.min.js' 
      }
      //
    },

    jshint: {
      files: [
        // Add filespec list here
        'Gruntfile.js',
        'lib/**/*.js',
        'server.js',
        'server-config.js',
        'builds/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
        // Add filespec list here
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
  grunt.registerTask('default', ['concat', 'uglify', 'jshint']); //
  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
      
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
      // add your production server task here
    'concat', 'uglify', 'jshint'

  ]);


};
