/*==================================================================
[ Slick1 ]*/
$('.wrap-slick1').each(function(){
    var wrapSlick1 = $(this);
    var slick1 = wrapSlick1.find('.slick1');

    var itemSlick1 = wrapSlick1.find('.item-slick1');
    var itemSlick1Length = itemSlick1.length;
    var isRtl = $('html').attr('dir') === 'rtl';

    if(itemSlick1Length > 1){
        slick1.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: false,
            autoplay: true,
            autoplaySpeed: 1800,
            speed: 450,
            pauseOnHover: false,
            infinite: true,
            dots: true,
            arrows: true,
            appendDots: wrapSlick1.find('.wrap-slick1-dots'),
            appendArrows: wrapSlick1,
            rtl: isRtl,
            prevArrow:'<button class="arrow-slick1 prev-slick1"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
            nextArrow:'<button class="arrow-slick1 next-slick1"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        });
    }
});

/*==================================================================
[ Slick2 ]*/
$('.wrap-slick2').each(function(){
    var wrapSlick2 = $(this);
    var slick2 = wrapSlick2.find('.slick2');

    var itemSlick2 = wrapSlick2.find('.item-slick2');
    var itemSlick2Length = itemSlick2.length;
    var isRtl = $('html').attr('dir') === 'rtl';

    if(itemSlick2Length > 1){
        slick2.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: false,
            autoplay: true,
            autoplaySpeed: 1800,
            speed: 450,
            pauseOnHover: false,
            infinite: true,
            dots: true,
            arrows: true,
            appendDots: wrapSlick2.find('.wrap-slick2-dots'),
            appendArrows: wrapSlick2,
            rtl: isRtl,
            prevArrow:'<button class="arrow-slick2 prev-slick2"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
            nextArrow:'<button class="arrow-slick2 next-slick2"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        });
    }
});

/*==================================================================
[ Slick3 ]*/
$('.wrap-slick3').each(function(){
    var wrapSlick3 = $(this);
    var slick3 = wrapSlick3.find('.slick3');

    var itemSlick3 = wrapSlick3.find('.item-slick3');
    var itemSlick3Length = itemSlick3.length;
    var isRtl = $('html').attr('dir') === 'rtl';

    if(itemSlick3Length > 1){
        slick3.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: false,
            autoplay: true,
            autoplaySpeed: 1800,
            speed: 450,
            pauseOnHover: false,
            infinite: true,
            dots: true,
            arrows: true,
            appendDots: wrapSlick3.find('.wrap-slick3-dots'),
            appendArrows: wrapSlick3,
            rtl: isRtl,
            prevArrow:'<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
            nextArrow:'<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        });
    }
});

/*==================================================================
[ Mini Gallery Slider ]*/
$('.wrap-slick-gallery').each(function(){
    var wrapSlickGallery = $(this);
    var slickGallery = wrapSlickGallery.find('.slick-gallery');

    var itemSlickGallery = wrapSlickGallery.find('.item-slick-gallery');
    var itemSlickGalleryLength = itemSlickGallery.length;

    if(itemSlickGalleryLength > 1){
        slickGallery.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 800,
            infinite: true,
            dots: true,
            arrows: true,
            appendArrows: wrapSlickGallery.find('.wrap-slick-gallery-dots'),
            prevArrow:'<button class="arrow-slick-gallery prev-slick-gallery"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
            nextArrow:'<button class="arrow-slick-gallery next-slick-gallery"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        });
    }
});
