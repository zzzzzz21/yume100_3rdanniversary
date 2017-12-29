'use strict';
// livereload用の処理
var
	path = require('path'),
	lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
	folderMount = function folderMount(connect, point) {
		return connect.static(path.resolve(point));
	};
 
module.exports = function(grunt) {
	var pkg, taskName;
	pkg = grunt.file.readJSON('package.json');
 
	grunt.initConfig({
		pkg: pkg,
		dir: {
			src:'src',
			bin:'bin',
			share:'share',
			release:'release',
			lib:'lib',
			js: 'js',
			css: 'css',
			img:'images',
			sass:'sass'
		},
		// bowerでパッケージをインストール
		bower: {
			install: {
				options: {
					targetDir: '<%= dir.src %>/lib', //ライブラリの配置先のディレクトリ
					layout: 'byType', // レイアウト
					install: true, //grunt実行時にbower installを実行するかどうか
					verbose: false, // ログの詳細を出すかどうか
					cleanTargetDir: true, // targetDirを削除するかどうか
					cleanBowerDir: false // bowerのcomponentsディレクトリを削除するかどうか
				}
			}
		},
		// bowerでインストールしたjsパッケージを結合
		concat: {
			files: {
				// 元ファイルの指定
				src : ['<%= dir.src %>/<%= dir.lib %>/<%= dir.js %>/**/*.js'],
				// 出力ファイルの指定
				dest: '<%= dir.bin %>/<%= dir.share %>/<%= dir.lib %>/<%= dir.js %>/<%= dir.lib %>s.js'
			}
		},
		// ファイルをコピーする
		copy: {
			html: {
				expand: true,
				// コピー元のディレクトリ
				cwd: '<%= dir.bin %>/',
				src: ['**/*.html'],
				// コピー先のディレクトリ
				dest: '<%= dir.release %>/'
			},
			css: {
				expand: true,
				cwd: '<%= dir.bin %>/',
				src: ['<%= dir.share %>/<%= dir.css  %>/**'],
				dest: '<%= dir.release %>/'
			},
			images: {
				expand: true,
				cwd: '<%= dir.bin %>/',
				src: ['<%= dir.share %>/<%= dir.img  %>/**','<%= dir.img %>/**'],
				dest: '<%= dir.release %>/'
			},
			js: {
				expand: true,
				cwd: '<%= dir.bin %>/',
				src: ['<%= dir.share %>/<%= dir.js %>/**'],
				dest: '<%= dir.release %>/'
			}
		},
		// HTMLを圧縮する
		htmlmin: {
			all: {
				options: {
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeCDATASectionsFromCDATA: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					removeOptionalTags: true
				},
				expand: true,
				cwd: '<%= dir.bin %>/',
				src: ['**/*.html'],
				dest: '<%= dir.release %>/'
			}
		},
		// JSを圧縮する
		uglify: {
			min: {
				expand: true,
				cwd: '<%= dir.bin %>',
				src: ['**/libs.js','**/fn.js'],
				dest: '<%= dir.release %>'
			}
		},
		// CSSを圧縮する
		cssmin: {
			all: {
				expand: true,
				cwd: '<%= dir.bin %>/<%= dir.share %>/<%= dir.css %>/',
				src: ['*.css'],
				dest: '<%= dir.release %>/<%= dir.share %>/<%= dir.css %>/'
			}
		},
		// 画像を圧縮する
/*		imageoptim: {
			files: ['<%= dir.bin %>/'],
			options: {
				jpegMini: true,
				quitAfter: true
			}
		},*/
		// 不要なファイルを削除する
		clean: {
			// releaseフォルダ内を削除する
			deleteReleaseFolder: {
				src: '<%= dir.release %>/'
			},
			// releaseから不要なファイルを削除する
			deleteReleaseFile: {
				src: [
					'<%= dir.release %>/<%= dir.img %>/sprite'
				],
			}
		},
		// browserSyncの設定
		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'<%= dir.bin %>/**/*.css',
						'<%= dir.bin %>/**/*.jpg',
						'<%= dir.bin %>/**/*.png',
						'<%= dir.bin %>/**/*.gif',
						'<%= dir.bin %>/**/*.js',
						'<%= dir.bin %>/**/*.html'
					]
				},
				options: {
					watchTask: true,
					server: './bin'
					
				}
			}
		},

		// メディアクエリをまとめる
		cmq:{
			options: {
				log: true
			},
			dev: {
				files: {
					'<%= dir.bin %>/<%= dir.share %>/<%= dir.css %>/style.css': ['bin/<%= dir.share %>/<%= dir.css  %>/style.css']
				}
			}
		},

		// Compassの設定
		compass: {
			dist: {
				options: {
					config: '<%= dir.src %>/<%= dir.sass %>/config.rb'
				}
			}
		},
		
		//
		notify: {
			sass:{
		        options: {
		        	title: 'Sass',
		        	message: 'Sass Compile!!'
		        }
			}
		},
		
		// ファイルを監視する
		watch: {
			html: {
				files: ['<%= dir.bin %>/**/*.html'],
				tasks: [],
				options: {
					livereload: true,
					nospawn: true
				}
			},
			js: {
				files: ['<%= dir.bin %>/**/*.js'],
				tasks: [],
				options: {
					livereload: true,
					nospawn: true
				}
			},
			sass: {
				files: ['<%= dir.src %>/<%= dir.sass %>/**/*.scss'],
				tasks: ['compass', 'csscomb', 'notify:sass'],
				options: {
					livereload: true,
					nospawn: true
				}
			},
		},
		// CSSのプロパティを揃える
		csscomb:{
			options: {
				config: 'csscomb.json'
			},
			dev:{
				expand: true,
				cwd: '<%= dir.bin %>/**/<%= dir.share %>/<%= dir.css %>/',
				src: ['*.css'],
				dest: '<%= dir.bin %>/**/<%= dir.share %>/<%= dir.css %>/'
			}
		}
	});
 
 
 
 
	// pakage.jsonに記載されているパッケージを自動読み込み
	for(taskName in pkg.devDependencies) {
		if(taskName.substring(0, 6) == 'grunt-') {
			grunt.loadNpmTasks(taskName);
		}
	}
 
	// sassをコンパイルするgruntコマンド
	grunt.registerTask('default', ['browserSync', 'watch']);
 
	// 画像を圧縮するためのgruntコマンド
	grunt.registerTask('imgmin', ['imageoptim']);
 
	// 社内確認用のファイルを作るためのgruntコマンド
	grunt.registerTask('check', ['clean:deleteReleaseFolder', 'copy:html', 'copy:css', 'copy:images', 'copy:js', 'cmq', 'clean:deleteReleaseFile']);
 
	// 納品用のファイルを作るためのgruntコマンド
	grunt.registerTask('release', ['clean:deleteReleaseFolder', 'copy:images', 'copy:js', 'htmlmin', 'cssmin','cmq', 'uglify', 'clean:deleteReleaseFile']);
 
	grunt.registerTask('eatwarnings', function() {
		grunt.warn = grunt.fail.warn = function(warning) {
			grunt.log.error(warning);
		};
	});
};