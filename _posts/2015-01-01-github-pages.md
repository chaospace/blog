---
layout: post

title: jekyll + github-pages 사용기
subtitle: "github 버전관리만 되는게 아니였어?"
cover_image: blog-cover.jpg

excerpt: "github-pages를 통해 블로그를 만들어 보자."

tag: [github, jekyll, github-pages]

category: "programming"

sitemap:
  lastmod: 2015-01-01
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

github를 사용하다 github-pages를 통해 블로그를 만들 수 있다는 글을 보고 만들어 보았다. 간단히 설명하자면 github를 통한 버전관리처럼 로컬에서 markdown파일만 작성하면 웹에서 접근이 가능하다.  
자세한 내용은 아래 사이트를 참고하자.

- [github-pages사이트](https://pages.github.com/)
- [github-page dependency](https://pages.github.com/versions/)

***

### Ruby와 RubyDevTool 설치
 
- [ruby](http://rubyinstaller.org/downloads/) (설치당시 2.1.5버전 32bit 사용 )
- [rubyDevTool](http://rubyinstaller.org/downloads/)

window에서 ruby는 installer를 이용하면 알아서 설치되지만  
rubyDevTool은 압축을 풀은 후 직접 설치해야 된다.

{% highlight ruby %}
c:\rubyDev21 ruby dk.rb init
// init후 devtool설치 폴더의 config파일에 devtool설치 경로를 추가
c:\rubyDev21 ruby dk.rb install
{% endhighlight %}

***

### github-pages설치

콘솔창에서 **gem install github-pages** 명령어를 이용해 설치를 시작한다.
{% highlight JavaScript %}
 /*dependency list*/
 jekyll	2.4.0
 jekyll-coffeescript	1.0.1
 jekyll-sass-converter	1.2.0
 kramdown	1.3.1
 maruku	0.7.0
 rdiscount	2.1.7
 redcarpet	3.1.2
 RedCloth	4.2.9
 liquid	2.6.1
 pygments.rb	0.6.0
 jemoji	0.4.0
 jekyll-mentions	0.2.0
 jekyll-redirect-from	0.6.2
 jekyll-sitemap	0.6.3
 github-pages	30
 ruby	2.1.1
{% endhighlight %}

***

### Jekyll

github-pages를 설치하면 [jekyll](http://jekyllrb.com/)이 자동으로 설치되는데  
요녀석이 markdown만 작성하면 정적 웹사이트 혹은 블로그로 만들어 버리는 녀석이다.

[![jekyll로고 이미지]( http://jekyllrb.com/img/logo-2x.png 'jekyll logo')](http://jekyllrb.com/)

jekyll이 설치 됐다면 콘솔을 통해 블로그의 기본 뼈대를 만든다.
{% highlight ruby %}
	jekyll new blog // blog  생성
	cd blog			// blog 폴더 이동
	jekyll serve --watch // 로컬 서버 시작 및 변경 감지 
{% endhighlight %}

완료되면 아래 처럼 블로그 폴더가 생성된다.
![jekyll 블로그 폴더 구조]( /images/2015-01-01/jekyll-folder-tree.jpg 'jekyll blog folder-tree' )

생성되는 파일 중 바로 사용할 때 알아야 하는 건 아래 2가지 정도다.

- _posts
:  markdonw파일이 있는 곳으로 블로그 post로 이용.

- _confg.yml
:  사이트 전반에 사용되는 설정 값. 아래 참고

{% highlight JavaScript %}
  # Site settings
  title: Travelog   // 블로그 타이틀
  subtitle: "Journal of [name]" // 서브 타이틀
  email: your-email@domain.com  // email 
  description: "Make the footer happy by entering a short description about yourself here"
  baseurl: "" // 기본 주소 
  url: "http://yourdomain.com"
  twitter_username: "rowanoulton" // twitter id
  github_username:  "rowanoulton" // github id
  instagram_username: "rowanoulton" // instagram_id 

  # Build settings
  markdown: kramdown // markdonw parser
  permalink: pretty
{% endhighlight %}

**localhost:4000**을 통해 로컬에서 브라우저로 확인 할 수 있다.
![jekyll 블로그 템플릿 실행화면]( /images/2015-01-01/jekyll-blog-template.jpg 'jekyll blog template' )

***

### github-pages로 확인하기

jekyll로 만들어진 내용을 github-pages에 반영하는 순서로 아래와 같다.

1. github에 블로그 repository생성
2. 저장소에 push
3. gh-pages 브랜치 생성
4. github-username/github.io/repository-name 으로 확인

***

### jekyll-teheme 적용

기본 템플릿이 아쉽다면 [jekyll-themes](http://jekyllthemes.org/)사이트를 통해 적용이 가능하다.  
물론 직접 만들어서 사용하는 것도 가능.

***

###참고자료 

[마크다운 가이드](http://scriptogr.am/myevan/post/markdown-syntax-guide-for-scriptogram)