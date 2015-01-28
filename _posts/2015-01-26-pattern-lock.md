---
layout: post

title: PatternLock
subtitle: "canvas를 활용한 패턴잠금화면 만들기"
cover_image: blog-cover.jpg

excerpt: "canvas를 이용한 안드로이드 패턴 잠금화면 기능 구현"

tag: [canvas, javascript, pattern-lock]

category: "programming"

sitemap:
  lastmod: 2015-01-26
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

{% include _figure.html src="/images/2015-01-26/pattern-lock.jpg" caption="점을 연결해 패턴을 제작하는 형태" %}
[PatternLock](http://chaospace.github.io/pattern-lock)  

프로젝트에 안드로이드 패턴잠금화면과 유사하게 아이콘을 연결해 패턴을 그리고  
그린 패턴을 저장하기로 제공하는 기능이 필요해 canvas를 이용해 prototype을 제작해 보았다.  

러프한 구현이라 일정한 간격으로 점을 배치하고 터치&드래그 시 터치된 점의 컬러를 변경하고  
변경된 점을 기억했다 선으로 연결하는 정도로 만들어 보았다.
 
{% highlight javascript %}
// 점 좌표 위치 선언
 var dotPoints=[
             {x:50, y:100},
             {x:150, y:100},
             {x:250, y:100},
             {x:50, y:200},
             {x:150, y:200},
             {x:250, y:200},
             {x:50, y:300},
             {x:150, y:300},
             {x:250, y:300}
         ]; 

// 클릭(터치) 후 마우스 움직일 때 지나간 점을 체크 후 라인으로 연결
function onMouseMove_Screen( e ){
    if( isPress ){
        var hit = getDotHitTest(e.layerX, e.layerY);
        drawLine();
    }    
}   

// 터치된 점을 라인으로 연결
function drawLine(){
            
    var hitDot;
    var prevDot;
    for( var i=0; i<hitDots.length; i++ ) {

        hitDot  = hitDots[i];
        ctx.save();
        if( prevDot ){
            ctx.beginPath();
            ctx.strokeStyle = "rgba( 255, 100, 0, 1)";
            ctx.lineWidth   = 2;
            ctx.moveTo( prevDot.x, prevDot.y );
            ctx.lineTo( hitDot.x, hitDot.y );
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
        prevDot = hitDot;
        
    }

}    
{% endhighlight %}

기본 구현은 이정도로 끝내고 보니 '객체로 만들어 보면 어떻게 될까?' 하는 생각이 들었고  
PatternLock객체로 만들어 보기로 했다.

***

### PatternLock객체 만들기

객체방식 변경을 위해 익명함수를 선언하고 안에 PatternLock객체를 선언하고 기본적인  
진행 방식을 생각해보다 canvas에 **'layer개념을 적용해 보면 어떻게 될까?'** 생각이 들었다.  

[canvas layer참고](http://html5.litten.com/using-multiple-html5-canvases-as-layers/)  

레이어별로 기능은 아래와 같이 나누어 봤다.

- layer1 : 기본 패턴 포인트
- layer2 : 터치된 패턴 포인트 & 라인
- layer3 : 현재 드래그 위치

기능별 Layer제작을 위해 기본 Layer객체를 선언하고 Layer를 확장한 역할에 맞는 객체를 선언했다.  
상속을 이용하기 위해 extend함수를 이용했다.  
대략적인 내용은 아래와 같다.

{% highlight javascript %}

// 객체 확장 함수
function extend(base, sub) {
  
  var origProto = sub.prototype;
  sub.prototype = Object.create(base.prototype);
  
  for (var key in origProto)  {
     sub.prototype[key] = origProto[key];
  }
  // Remember the constructor property was set wrong, let's fix it
  sub.prototype.constructor = sub;
  
  Object.defineProperty(sub.prototype, 'constructor', { 
    enumerable: false, 
    value: sub 
  });
}

// 기본 Layer객체 선언
var Layer = function( layerElement ){
    this.canvas     = layerElement;
    this.ctx        = this.canvas.getContext('2d');
    this.items      = [];
}
// 기본 함수 정의 후 override를 이용해 각 레이어별 기능을 구현한다.
Layer.prototype ={
    canvas:null,
    ctx:null,
    items:null,
    
    render:function(){
        // override
    },
    reset:function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
    destory:function(){
         // override
    },
    
    setItems: function( objItems ){
        this.items = objItems;
    },
    
    getItems: function(){
        return this.items;
    },
    
    appendItem:function(objItem){
        this.items.push(objItem);
    },
    
    removeItem:function( objItem ){
        var o;
        for( var i=0; i<this.items.length; i++ ){
            o = this.items[i];
            if( o == objItem){
                this.items.splice(i, 1);
                return;
            }
        }
    }

};

// focus 레이어 구현
var FocusLayer  = function( layerElement ){
    Layer.call( this, layerElement );
};

FocusLayer.prototype = {
    // 요소 추가시 hit속성을 변경 후 상위 객체 함수 호출
    appendItem: function( objItem ){
        objItem.hit = true;
        Layer.prototype.appendItem.call( this, objItem );
    },
    
    removeItem: function( objItem ){
        objItem.hit =false;
        Layer.prototype.removeItem.call( this, objItem );
    }
}

// point레이어 구현
var PointLayer  =function( layerElement ){
    Layer.call( this, layerElement );
}; 

PointLayer.prototype = {
    render:function(){
        
        var point;
        for( var i=0; i < this.items.length; i++ ) {
            point = this.items[i];
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.fillStyle = point.getColor();
            this.ctx.arc( point.x, point.y, point.radius, 0, Math.PI*2);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.restore();
        }
    }
}

{% endhighlight %}
 
객체 기반으로 했으니 포인트 정보를 나타내는 객체역시 LockPoint로 선언하여 이용한다.

{% highlight javascript %}

LockPoint.prototype = {
    x:null,
    y:null,
    radius:null,
    hitRadius:null,
    hit:false, // 클릭(터치) 여부 
    getColor:function(){
        return (this.hit) ? FOCUS_COLOR : POINT_COLOR;
    }
}

{% endhighlight %}

LockPoint와 Layer객체를 사용한 PatternLock객체를 선언

{% highlight javascript %}

/* 확장 */
extend( Layer, FocusLayer );
extend( Layer, PointLayer );
extend( Layer, LineLayer );

// PatternLock객체 선언
var PatternLock =function( options ){
    var info =extendOptions( options || {} , this.options );
    this.initialize( info );
    this.initializeEvent();
    this.renderPatternPoint();
};


PatternLock.prototype ={
    container:null,
    focusLayer:null,
    lineLayer:null,
    pointLayer:null,
    snapshotLayer:null,
    snapshotData:null,
    onCreateSnapshot: null,
    
    options:{
        layers:["snapshot-layer", "point-layer", "focus-layer", "line-layer"],
        container:"lock-container",
        points:[
             {x:50, y:100},
             {x:150, y:100},
             {x:250, y:100},
             {x:50, y:200},
             {x:150, y:200},
             {x:250, y:200},
             {x:50, y:300},
             {x:150, y:300},
             {x:250, y:300},
             {x:50, y:400},
             {x:150, y:400},
             {x:250, y:400}
        ],
        onCreateSnapshot:null
    }
}
{% endhighlight %}


***

### 이미지 저장 기능

이미지 정보는 canvas의 toDataURL을 이용해 만들고  
다운로드는 a태그를 이용했다. 

{% highlight javascript %}
<a id="download" download="snapshot.jpg">download image</a>

// 클릭 시 href속성에 이미지 정보를 설정하면 다운로드가 된다.
function downloadFile(){
    if(snapshotData){
        this.href=snapshotData;
    }
}

addEvent( "click", document.getElementById("download"), downloadFile );
{% endhighlight %}

위 방식의 문제는 ie에서 download속성을 지원하지 않아  작동하지 않는다는 점이다.  
그래서 새창을 이용해 이미지를 띄우고 셀프 저장방식으로 변경했다.

{% highlight javascript %}
function onClick_DownLoad(){
    if(patternLock.snapshotData){
       var html="<p>Right-click on image below and Save-Picture-As</p>";
       html+="<img src='"+patternLock.snapshotData+"' alt='from canvas'/>";
       var tab=window.open();
       tab.document.write(html);
    }
};
{% endhighlight %}

***

### 제작 후기
- canvas를 이용한 layer처리는 어설프게 이용하면 더 힘들어진다.  
- ie에서 a태그의 download속성을 지원하지 않는다.
- 마우스 event에 layerX, layerY속성이 하위 브라우저에서 지원되지 않는다.


