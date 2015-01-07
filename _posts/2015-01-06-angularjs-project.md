---
layout: post

title: angularjs 사용기
subtitle: "google이 만들면 뭔가 다르긴 다르다. 이게 진짜 js?"
cover_image: blog-cover.jpg

excerpt: "jquery와 angularjs를 같은 프로젝트에 적용해 보며 체험해 보기"

tag: [angularjs, javascript]

category: "programming"

sitemap:
  lastmod: 2015-01-06
  priority: 0.7
  changefreq: 'monthly'
  exclude: 'yes'
  
author:
  name: chaospace
  twitter: ichaospace
  gplus: 100687498195339762535 
  bio: Front&Developer
  image: ks.png
---

{% include _figure.html src="https://angularjs.org/img/AngularJS-large.png" href="https://www.angularjs.org/" target="_blank" caption="" %}

간단한 예제를 통해 바인딩 기능과 각 controller의 scope을 통해  
신기방기한 framework이라는 건 알았지만 제대로 사용해 본적이 없는데  
프로젝트 정리 페이지 제작에 적용해 보았다.
결과물은 우측 상단의  
[projects](http://chaospace.github.io/projects)메뉴를 통해 확인이 가능하다.

***

### Projects 설정

에디터는 webstorm을 이용했고, scss, github도 같이 경험해 보는게 목적이었다.  
제공 템플릿 중 [html5 boilerplate](http://html5boilerplate.com/)으로 플젝을 시작했다.

{% highlight html %}
// 브라우저 대응에 필요한 기본요소가 적용된 html
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]>  <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>  <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <script src="js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body>
    <!--[if lt IE 7]>
    <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please 
    <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <!-- Add your site or application content here -->
    <p>Hello world! This is HTML5 Boilerplate.</p>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"></script>')</script>
    <script src="js/plugins.js"></script>
    <script src="js/main.js"></script>

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','UA-XXXXX-X');ga('send','pageview');
    </script>
</body>
</html>
{% endhighlight %}

제공되는 틀에서 jquery부분은 angular사용 시 필요없다고 판단하여 제거했다.
{% include _figure.html src="/images/2015-01-06/project-folder-structure.jpg" caption="프로젝트 폴더 구조" %}

***

### Projects 전체구조
- application을 선언
{% highlight javascript %}
    var cpApp = angular.module('cpProjectApp',[]);
{% endhighlight %}

- html에 바인딩
{% highlight html %}
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7" ng-app="cpProjectApp"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8" ng-app="cpProjectApp"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9" ng-app="cpProjectApp"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" ng-app="cpProjectApp"><!--<![endif]-->
{% endhighlight %}

- index.html 골격
{% highlight html %}
 <div id="WRAPPER-LAYER">
    <div id="MAIN-LAYER">
        <!-- 네비게이션 영역 -->
        <div id="navigation-layer">
            <div id="nav-container" ng-controller="NavigationController">
                <div class="logo-motion-area mask" ng-click="goHome()"></div>
                <!--ajax 연동을 통한 네비 구성-->
                <nav id="navigations">
                    <ul class="menu">
                        <!--  메뉴 ( 템플릿 ) -->
                        <li ng-repeat="naviData in naviList">
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="emblem-container"></div>
        </div>
        <!--컨텐츠 영역-->
        <div id="content-layer">
            <!-- 상세 페이지 영역 -->
            <div ng-view class="ng-view-transition"></div>
            <!-- 플젝 리스트  추가 영역-->
            <project-list resizeable ng-transclude>
                <project-renderer  ng-repeat="project in projects">
                </project-renderer>				
            </project-list>
        </div>
        <!--풋더 영역-->
        <div id="footer-layer"></div>
    </div>
</div>
{% endhighlight %}

- controller  

controller는 기능별로 나누려 노력했지만 어느 선까지 할지는 사용자의 몫인것 같다.  
controllers.js에는 3개를 선언했고 directive에 연결된 2개의 컨트롤러를 더 선언했다.
{% highlight javascript %}
// 메뉴 컨트롤러
cpProjectControllers.controller( "NavigationController",function( $scope, appModel  ){}
// 상세 페이지 컨트롤러
cpProjectControllers.controller( "ProjectDetailController", function( $scope, $sce, $routeParams, Project ){}
// 로딩 바 컨트롤러
cpProjectControllers.controller( "ProgressViewController", function( $scope, appModel ){}
{% endhighlight %}

- services 

지원되는 service종류가 다양한데 진행하는 플젝에는 factory를 선택했다.  
[angular-service-factory](http://viralpatel.net/blogs/angularjs-service-factory-tutorial/)

{% highlight javascript %}
// application 정보 모델 - factory
cpProjectServices.factory("appModel",function (  $http, $rootScope ){}
{% endhighlight %}

- directive

angularjs가 다방면에 우수하지만 핵심은 요 **directive**가 아닐까 싶다.  
angular만의 특징 대부분이 directive라 해도 과연이 아니고, custom directive제작을  
모른다면 진의를 파악하지 못한 초식을 사용하는 것처럼 허무할 것같다.( 오버인가 ㅎ)

나는 프로젝트 리스트 구성에 **projectList**, **projectRenderer**의 custom directive를 작성하고,  
resize이벤트 핸들러용 **resizeable** directive를 작성했다.

{% highlight html %}
<!-- projectList디렉티브는 projectRenderer디렉티브를 project 만큼 생성한다. -->
<project-list resizeable ng-transclude>
    <project-renderer class='renderer-transition' 
                        ng-repeat="project in projects">
    </project-renderer>				
</project-list>
{% endhighlight %}

{% highlight javascript %}
cpProjectDirectives.directive( "projectList", function(){
    return{
        replace:true,
        restrict:'EA',
        template:'<div id="project-container"></div>',
        transclude:true,        
        controller:function( $element, $scope, $q, $timeout, appModel, Project, $filter ){
        }
});
    
cpProjectDirectives.directive( "projectRenderer", 
    function( $compile, $http, $templateCache, $timeout ){

    return {
        restrict:"E",
        replace:true,
        // require옵션을 이용 projectList를 필수요소로 지정
        require:['^projectList', 'projectRenderer'],
        template:'<div ng-include="getTemplateUrl()"></div>',
        link:function( scope, iElement, iAttr, controllers ){
        },
        controller:function( $scope, $sce, appModel , $timeout ){
        }
});
{% endhighlight %}
custom directive를 제작하다보면 angular의 내부 구현에 대해 공부를 안할 수 없게 되는데,  
projectList와 projectRenderer를 만들며 replace와 include시 ng-repeat의 문제에서 부터,  
directive간의 소통방법을 찾기며 원치않게 angular의 scope관계를 알게된 것 같다.  
**[directive communication](https://thinkster.io/egghead/directive-to-directive-communication/)**

{% include _figure.html src="/images/2015-01-06/project-renderer-type.jpg" caption="renderer에 타입을 두어 효과를 다르게 사용" %}
<br>
renderer타입의 구분은 ng-include ="getTemplateUrl()"을 통해 project.template값으로 구분했다.

{% highlight javascript %}
$scope.getTemplateUrl	=function(){
    // 해당 플젝이 사용할 teamplate 주소를 반환
    return PARTISAL_PATH + $scope.project.template;
};
{% endhighlight %}

***

에니메이션 부분을 좀 적어두고 싶지만 길이 길어지는 관계로 다음에 추가 하기로...