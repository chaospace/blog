---
layout: post

title: angularjs 사용기 part2
subtitle: "angularjs ng-animate 적용기"
cover_image: blog-cover.jpg

excerpt: "angularjs에서 제공해주는 animation사용해 보기"

tag: [angularjs, javascript]

category: "programming"

sitemap:
  lastmod: 2015-01-11
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

angular에서 제공해주는 animation은 기본적으로 css선택자를 통해 제공하는데  
각 요소별 제공하는 선택자는 아래와 같다.  

| Directive |       Supported Animations     |  
| :--------- | ------------------------------: |
| ngRepeat        | enter, leave and move   | 
| ngView          | enter and leave   | 
| ngInclude       | enter and leave   | 
| ngSwitch        | enter and leave   |
| ngIf            | enter and leave   |
| ngClass         | add and remove (the CSS class(es) present)    |
| ngShow & ngHide | add and remove (the ng-hide class value)  |
| form & ngModel  | add and remove (dirty, pristine, valid, invalid & all other validations)  |
| ngMessages      | add and remove (ng-active & ng-inactive)  |
| ngMessage       | enter and leave   |

***
사용법은 아래와 같이 ng-animate 디렉티브에 상태에 사용할 css지정자를 지정하고  
css에 해당 animation효과를 적용하면 자동으로 실행된다.

{% highlight html %}
<div ng-repeat="item in itens" ng-animate="{enter: 'animate-enter', leave: 'animate-leave'}">
</div>
{% endhighlight %}

{% highlight css %}
.animate-enter {
    -webkit-transition: 1s linear all; /* Chrome */
    transition: 1s linear all;
    opacity: 0;
}
 
.animate-enter.animate-enter-active {
    opacity: 1;
}
{% endhighlight %}

자세한 내용은 [공식 사이트 예제](http://www.nganimate.org/)를 참고.

***


### JavaScript를 이용한 Animation

ng-animate를 통해 손쉽게 animation효과를 제공하는 angularjs이지만  
css선택자로는 구현하기 힘든 animation의 경우는 js를 이용하면 좋을 듯 합니다.  
사용법은 animation모듈을 이용해 별도로 지정해 준다는 점을 제외하면  
css를 이용한 것과 흡사합니다.

{% highlight javascript %}
ojectAnimations = angular.module( 'cpProjectAnimations', ['ngAnimate', 'cpProjectServices'] );

cpProjectAnimations.animation( '.renderer-transition', function( appModel ){
    function animationStart( element, done ){
        // animation효과
    }
    
    function animationHide( element, done ){
        // animation효과
    };
    // enter, leave시 각 함수를 실행하는 객체를 리턴
    return{
        enter:animationStart
        ,leave:animationHide
    }
});
{% endhighlight %}
 
위에 선언한 renderer-transition 클래스를 element에 적용.
{% highlight html %}
<project-renderer class='renderer-transition' 
                         ng-repeat="project in projects">
</project-renderer>		
{% endhighlight %}

자세한 사용법은 [animation-in-angularjs-1-2](http://www.yearofmoo.com/2013/08/remastered-animation-in-angularjs-1-2.html)를 참고

***

### 사용 후기
- angularjs는 꽤 매력적인 framework이다.
    
    javascript로 원하는 어느 곳이든 scope을 만들수 있고  
    directive를 통한 컴포넌트 제작 베이스의 작업은  
    꽤 훌룡한 매력이란 생각이 든다.

- interactive한 웹 사이트 제작에는 생각이 필요하다.

    binding을 통한 동적 컨텐츠 제공은 우수하지만  
    interactive의 성격에 따라 jquery를 쓰는게
    더 좋은 판단이란 생각도 든다.

- directive는 반드시 잘 파악해야 한다.
    
    angular = directive라 해도 과언이 아닐 듯한 기분을 가졌다.(개인적으로)  
    
***

### 참고 자료
[Code School](https://www.codeschool.com/courses/shaping-up-with-angular-js)  
[How to get started AngularJS](https://www.codeschool.com/courses/shaping-up-with-angular-js)  

