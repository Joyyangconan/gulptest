var lunBo = (function(){

  function Carousel(container){
    this.init(container);
    this.bind();
  }



  Carousel.prototype.init = function(container){
    this.$ulpic = container.find('.picwrap');
    this.$piclist = this.$ulpic.children();
    this.imageWidth = this.$piclist.width();

    this.$touchlist = container.find('.touchbar li');

    this.$leftbtn = container.find('.btn1');
    this.$rgtbtn = container.find('.btn2');
    
    this.$ulpic.append(this.$piclist.eq(0).clone());
    this.$ulpic.prepend(this.$piclist.eq(this.$piclist.length-1).clone());
    this.$ulpic.width(this.$ulpic.children().length*this.imageWidth);
    this.playlockr = true;
    this.playlockl = true;
  }


  Carousel.prototype.bind = function(){
      var self = this;
      this.$touchlist.on('mouseover',function(){  
      self.dotselected($(this))
      var linum = self.$touchlist.index($(this));
        self.$ulpic.stop().animate({'left': -self.imageWidth*(linum+1)}, 1000);
    })
    // var playlockr = true;
    // var playlockl = true;
    this.$leftbtn.on('click',function(){
      console.log(self.playPre)
      self.playPre();
    })

    this.$rgtbtn.on('click',function(){
      self.playNext();
    })
  }

  Carousel.prototype.playNext = function(){
    var self = this;
      var $css_left = parseInt(this.$ulpic.css('left'));
      var pageIndex = Math.abs($css_left)/this.imageWidth;
      pageIndex++;      
      if(this.playlockr){
      if(pageIndex > this.$ulpic.children().length-2){
        this.playlockr = false;
        this.dotselected(this.$touchlist.eq(0));
        this.$ulpic.animate({'left': -pageIndex*self.imageWidth},400,function(){self.$ulpic.css('left', -self.imageWidth);self.playlockr = true;});
        
      } else {
        this.playlockr = false;
        this.dotselected(this.$touchlist.eq(pageIndex-1));
        this.$ulpic.animate({'left': -pageIndex*self.imageWidth},400,function(){self.playlockr = true;});
      }
      }  
  }

  Carousel.prototype.playPre = function(){
    var self = this;
      var $css_left = parseInt(this.$ulpic.css('left'));
      var pageIndex = Math.abs($css_left)/this.imageWidth;
      pageIndex--;
      if(this.playlockl){
      if(pageIndex === 0){
        this.playlockl = false;
        this.dotselected(this.$touchlist.eq(this.$ulpic.children().length-3));
        this.$ulpic.animate({'left': 0},400,function(){self.$ulpic.css('left', -(self.$ulpic.children().length-2)*self.imageWidth);self.playlockl = true;});

      } else {
        this.playlockl = false;
        this.dotselected(this.$touchlist.eq(pageIndex-1));
        this.$ulpic.animate({'left': -pageIndex*self.imageWidth},400,function(){self.playlockl = true;});

      } 
      }    
  }


    Carousel.prototype.dotselected = function(node){
      node.siblings('.touchbar>li').css('background-color','#777')
      node.css('background-color','#eee')
    }


    return {
      init: function($ctn){
        $ctn.each(function(idx,ele){
          console.log(ele)
          new Carousel($(ele));
        })
      }
    }





})()
