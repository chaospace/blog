---
layout: post

title: angularjs 사용기
subtitle: "google이 만들면 뭔가 다르긴 다르다. 이게 진짜 js?"
cover_image: blog-cover.jpg

excerpt: "jquery와 angularjs를 같은 프로젝트에 적용해 보며 체험해 보기"

tag: [angularjs, javascript]

category: "programming"

author:
  name: chaospace
  twitter: ichaospace
  gplus: 100687498195339762535 
  bio: Front&Developer
  image: ks.png
---

{% include _figure.html src="https://angularjs.org/img/AngularJS-large.png" caption="" %}

간단한 예제를 통해 바인딩 기능과 각 controller의 scope을 통해  
신기방기한 framework이라는 건 알았지만 제대로 사용해 본적이 없는데  
프로젝트 정리 페이지 제작에 적용해 보았다.
결과물은 우측 상단의  
[projects](http://chaospace.github.io/projects)메뉴를 통해 확인이 가능하다.

***

### Angularjs 사용부분

- 확인되지 않은 이메일 주소
- 지원되지 않는 플러그인
- 용량제한(1GB)
- _config.yml 설정 문제 
- 지속적인 통합 서비스 사용( travis ci사용 시 .travis.yml설정 )
- markdown 에러, utf-8인코딩, ... 기타 등등

다 확인해보지 않았지만 위에 언급된 에러는 설정화면에 가면  
앞에 이미지 처럼 error문구가 나올 듯 싶다.  
그럼 error문구 조차 없는 경우는 어떻게 할까 싶었는데  
글 후반에 [Travis CI profile page](https://travis-ci.org)을 언급하며  
**jekyll build 에러메시지를 보여주는 서비스** 블라블라... 가 보였다.

{% include _figure.html src="https://travis-ci.com/img/brand-standards/logo-lockup-vertical.svg" caption="Travis CI 로고" %}

***

### Travis CI

> CI는 Continuous Integration의 약자로  
프로그램 빌드 또는 테스트를 지속적으로  
할 것을 가리키는 프로그래머 용어.

음 그럼 testRunner 같은 녀석인데 Travis CI를 쓰면  
github에 배포된 코드를 Travis를 통해 테스트 가능한가 보군  
 ↑ 정도로 이해하고 사용법을 알아 보았다.
 
TravisCI 사용을 위해서는 

1. Travis CI사이트에서 github계정으로 로그인
2. 계정의 account메뉴 클릭
3. 저장소 목록 중 원하는 저장소의 버튼을 on으로 설정
4. 설정한 저장소에 .travis.yml 파일 생성 
5. 저장소 Webhooks & Service메뉴 클릭 후 Travis CI확인
6. Travis CI 옆의 edit메뉴로 상태 확인
7. 저장소 push후 travis ci에 등록된 저장소 확인  

***

{% include _figure.html src="/images/2015-01-05/travis-ci-repo-list.jpg" caption="저장소 목록" %}
{% include _figure.html src="/images/2015-01-05/git-services.jpg" caption="저장소의 services메뉴의 Travis CI확인" %}
{% include _figure.html src="/images/2015-01-05/git-services-status.jpg" caption="services상태 확인" %}
{% include _figure.html src="/images/2015-01-05/travis-ci-home.jpg" caption="travis에 등록된 저장소 확인" %}

***

↑위 사진처럼 travis연동 후 travis-ci에서 제공하는 콘솔 창을 통해  
jekyll의 build과정을 볼수 있고 이때 어떤 과정에서 에러가 나는지 확인 할 수 있다.  

### 확인한 나의 에러는
- window환경이라 config.yml에서 hilighter: rouge를 사용.
- 언어옵션에서 plaintext사용.
- github는 hilighter : pygments사용
- 언어옵션에 plaintext옵션이 없음.

{% include _figure.html src="http://lh4.ggpht.com/-6Ao3UhixyY0/UEhi2_DQL_I/AAAAAAAAB1E/Ah3z0w-dswU/OTL.png" caption="window 미워!" %}

***

### 참고사항
.travis.yml에는 여러 옵션 값이 있지만 jekyll build과정을 보는 옵션은 아래와 같다.
{% highlight JavaScript %}
language : ruby
script	: "bundle exec jekyll build"
{% endhighlight %}  


Gemfile을 github-pages에 같이 올려두면 관련  
travis검사 시 plugIn설치 결과를 볼 수 있으니 참고하자.
{% highlight JavaScript %}
source 'https://rubygems.org'
gem 'github-pages'
{% endhighlight %}