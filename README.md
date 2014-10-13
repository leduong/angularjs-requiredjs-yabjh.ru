# AngularJS RequireJS

Includes Way Generators!

Required:

    Git
    NodeJS
    Ruby Compass for SCSS or build with Less

Install Backend:

    Download package
    $ git https://github.com/leduong/angularjs-requiredjs-yabjh.ru.git
    $ cd angularjs-requiredjs-yabjh.ru

    RUN HTTP SERVICE
    with node-static
    $ static public/
    
    with php
    $ php -S 127.0.0.1:8080 -t public/
    
    with python 2.x, you can use the SimpleHTTPServer module like this
    $ cd public;python -m SimpleHTTPServer 8080
    
    With python 3.x, use:
    $ cd public;python -m http.server 8080
    
    Open http://127.0.0.1:8080


Install Node.js for development:

    $ npm install -g bower
    $ bower install
    $ npm install
    $ grunt

    build
    $ grunt build

- Setup your apache virtual host file. located: apache.conf or nginx.conf for nginx
Done
