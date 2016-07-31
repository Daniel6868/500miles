//-----------------Js File----------------------
$(document).ready(function(){

    $.ajax({
        async: true,
        url:"src/js/trip.json",
        type:'GET',
        cache:true,
        dataType : "json",
        success: function(data){
            Five100miles.init(data);
        }
    });
    var slideshow = new Slideshow({
        id : 'mainBanner',
        loop: true,
        autoplay: true,
        displayTime: 4000
    });


});

var Five100miles = {
    init: function(data){
        var webData = data,
            topBannersData = webData.topBanners,
            aboutUsData = webData.aboutUs,
            tripsData = webData.trips,
            countData = webData.countData,
            reviewData = webData.reviews
            ;
        Five100miles.topBanners(topBannersData);
        Five100miles.aboutUs(aboutUsData);
        Five100miles.tours(tripsData);
        Five100miles.countData(countData);
        Five100miles.reviews(reviewData);
    },
    aboutUs: function(data){
        $('.aboutus>h1').html(data.h1);
        $('.aboutus>h2').html(data.h2);
        $('.aboutus>h3').html(data.h3);
        $('.aboutus>p').html(data.p);
    },
    topBanners: function(data){
        var banners = data, slides = '';
        for(var i=0; i<banners.length; i++){
            slides += '<div class="slide"><figure>';
            slides += '<img src='+banners[i].url+' />';
            slides += '<div class="container"><figcaption><h3>'+banners[i].capHead+'</h3><p>'+banners[i].caption+'</p></figcaption></div>';
            slides += '</figure></div>';
        }
        // console.log(slides);
        // $('.slides').html(slides);

    },
    countData: function(data){
        $('.countArea > .row > .clients > .count').html(data.travellers);
        $('.countArea > .row > .videos > .count').html(data.videos);
        $('.countArea > .row > .photos > .count').html(data.photos);
        $('.countArea > .row > .trips > .count').html(data.tours);
    },
    tours: function(data){
        var trips = data, tours = '';
        for(var i=0; i<trips.length; i++){
            tours += '<div class="trip item"><div class="tripDetail">';
            tours += '<img src='+trips[i].tripPoster+' />';
            tours += '<label for="">'+trips[i].tripName+'</label>';
            tours += '<summary>'+trips[i].tripName+'</summary>';
            tours += '<a class="readMore" href='+trips[i].tripName+'>Read More...</a>';
            tours += '</div></div>';
        }
        // console.log(tours);
        $("#tourSlider").html(tours).owlCarousel({
            navigation : true,
            items:3
        });

    },
    reviews: function(data){
        var reviewData = data, reviews = '';
        for(var i=0; i<reviewData.length; i++){
            reviews += '<div class="item">';
            reviews += '<div class="left"><img src='+reviewData[i].userImg+' /></div>';
            reviews += '<div class="right">';
            reviews += '<h3>'+reviewData[i].userName+'</h3>';
            reviews += '<h4>'+reviewData[i].userTrip+'</h4>';
            reviews += '<p>\"'+reviewData[i].userReview+'\"</p>';
            reviews += '<p>Rating: '+reviewData[i].userRating+' / 5</p>';
            reviews += '</div></div>';
        }
        $("#reviewSlider").html(reviews).owlCarousel({
            navigation : false,
            items:2,
            autoPlay:true

        });
    },
    contactus: function(data){

    }

};
