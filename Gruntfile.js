module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify');

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options : {
                livereload: true
            },
            source: {
                files: [
                    'src/*.js',
                    'src/*/*.js',
                    'Gruntfile.js'
                ],
                tasks: [ 'build:js' ]
            }
        },

        browserify: {
            dist: {
                src: [
                    'src/PublicLab.Editor.js'
                ],
                dest: 'dist/PublicLab.Editor.js'
            },
            debug: {
                options : {
                    browserifyOptions: {
                        debug: true
                    }  
                }, 
                src: [
                    'src/PublicLab.Editor.js'
                ],
                dest: 'dist/PublicLab.Editor.js'
            }
        },

        jasmine: {
          publiclabeditor: {
            src: 'dist/*.js',
            options: {
              specs: 'spec/javascripts/*spec.js',
              vendor: [
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'node_modules/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
                'node_modules/blueimp-file-upload/js/jquery.iframe-transport.js',
                'node_modules/blueimp-file-upload/js/jquery.fileupload.js',
                'node_modules/typeahead.js/dist/typeahead.jquery.js',
                'node_modules/typeahead.js/dist/bloodhound.js',
                'node_modules/bootstrap-tokenfield/dist/bootstrap-tokenfield.js',
                'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
                'node_modules/jasmine-ajax/lib/mock-ajax.js',
                'https://maps.googleapis.com/maps/api/js?libraries=places&language=en&key=AIzaSyDWgc7p4WWFsO3y0MTe50vF4l4NUPcPuwE',
                'node_modules/leaflet-blurred-location/dist/Leaflet.BlurredLocation.js',
                'node_modules/leaflet/dist/leaflet.js'
              ] 
            }
          }
        }

    });

    /* Default (development): Watch files and build on change. */
    grunt.registerTask('default', ['watch' , 'jasmine']);

    grunt.registerTask('build', [
        'browserify:dist'
    ]);

    grunt.registerTask('debug', [
        'browserify:debug'
    ]);

    grunt.loadNpmTasks('grunt-contrib-jasmine');

};
