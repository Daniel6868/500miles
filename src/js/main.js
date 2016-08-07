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
});

var Five100miles = {
    init: function(data){
        var webData = data,
            topBannersData = webData.topBanners,
            homePageData = webData.homePage,
            aboutUsData = webData.aboutUs,
            tripsData = webData.trips,
            countData = webData.countData,
            reviewData = webData.reviews,
            galleryData = webData.galleryData,
            contactData = webData.contactDetails
            ;
        Five100miles.topBanners(topBannersData);
        Five100miles.homePage(homePageData);
        Five100miles.aboutUsPage(aboutUsData);
        Five100miles.tours(tripsData);
        Five100miles.countData(countData);
        Five100miles.reviews(reviewData);
        Five100miles.gallery(galleryData);
        Five100miles.contactus(contactData);
        Five100miles.bind();
    },
    homePage: function(data){
        $('.home>h1').html(data.h1);
        $('.home>h2').html(data.h2);
        $('.home>h3').html(data.h3);
        $('.home>p').html(data.p);
    },
    aboutUsPage: function(data){
        $('.aboutus>h1').html(data.h1);
        $('.aboutus>h2').html(data.h2);
        $('.aboutus>h3').html(data.h3);
        $('.aboutus>div').html(data.content);
    },
    topBanners: function(data){
        var banners = data, slides = '';
        for(var i=0; i<banners.length; i++){
            slides += '<div class="banner item"><figure>';
            slides += '<img src='+banners[i].url+' />';
            slides += '<div class="container"><figcaption><h3>'+banners[i].capHead+'</h3><p>'+banners[i].caption+'</p></figcaption></div>';
            slides += '</figure></div>';
        }
        // console.log(slides);
        $('.topBanner').html(slides).owlCarousel({
            navigation : false,
            autoPlay: true,
            responsive: true,
            mouseDrag:false,
            pagination: false,
            responsive:true,
            items:1
        });

    },
    countData: function(data){
        $('.countArea > .row > .clients > .count').html(data.travellers);
        $('.countArea > .row > .videos > .count').html(data.places);
        $('.countArea > .row > .photos > .count').html(data.photos);
        $('.countArea > .row > .trips > .count').html(data.tours);
    },
    tours: function(data){
        var trips = data, tours = '';
        for(var i=0; i<trips.length; i++){
            tours += '<div class="trip item"><div class="tripDetail">';
            tours += '<img src='+trips[i].tripPoster+' />';
            tours += '<label for="">'+trips[i].tripName+'</label>';
            tours += '<summary>'+trips[i].tripSummary+'</summary>';
            tours += '<a class="readMore" href="" data-id='+i+' data-toggle="modal" data-target="#myModal">... Read More</a>';
            tours += '</div></div>';
        }
        $("#tourSlider").html(tours).owlCarousel({
            navigation : true,
            responsive:true,
            items:3
        });
        $('.readMore').off().on('click', function(){
            var tourDetails = "", tourId = $(this).attr('data-id');
            tourDetails += "<div class='tourDetails'>";
            tourDetails += "<div class='tourPoster'><img src="+trips[tourId].tripPoster+" /></div>";
            tourDetails += "<div class='tourPlaces'>";
            for(var i=0; i<trips[tourId].tripLocs.length; i++){
                tourDetails += trips[tourId].tripLocs[i];
                if(i != trips[tourId].tripLocs.length-1){
                    tourDetails += '<span class="seperator"> - </span>';
                }
            }
            tourDetails += "</div>";
            tourDetails += "<hr/>";
            tourDetails += "<div class='tourDesc'><h4>Description:</h4>"+trips[tourId].tripDes+"</div>";
            tourDetails += "<div class='rows'><div class='tourTime col-md6'><h4>Total time taken: "+trips[tourId].tripTime+"</h4></div>";
            tourDetails += "<div class='tourGuide col-md6'><h4>Your Guide: "+trips[tourId].tripGuide+"</h4></div></div>";
            tourDetails += "<h4>To know more details: <a href="+trips[tourId].tripUrl+">Click here</></h4></div>";
            tourDetails += "</div>";

            $('.modal-title').html(trips[tourId].tripName);
            $('.modal-body').html(tourDetails);
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
            stopOnHover: true,
            responsive:true,
            autoPlay:true
        });
    },
    gallery:function(data){
        var galleryData = data, gallery = '';
        for(var i=0; i<galleryData.length; i++){
            gallery += '<div class="tripPics item" data-id='+i+' data-toggle="modal" data-target="#myModal"><div class="tripPicsDetail">';
            gallery += '<img src='+galleryData[i].tripPoster+' />';
            gallery += '<label>Trip Name: '+galleryData[i].tripName+'</label>';
            gallery += '</div></div>';
        }
        $("#photoSlide").html(gallery).owlCarousel({
            navigation : true,
            responsive:true,
            items:3
        });

        $('.tripPics').off().on('click', function(){
            var galleryDetails = "", galleryId = $(this).attr('data-id');
            // galleryDetails += "<div id='galleryDetails' class=''>";
            galleryDetails += "<div id='galleryDetails' class='owl-carousel'>";
            for(var i=0; i<galleryData[galleryId].tripPics.length; i++){
                galleryDetails += "<div class='galleryPic item'><img src="+galleryData[galleryId].tripPics[i]+" style='width:100%;'/></div>";
            }
            // galleryDetails += "</div>";
            galleryDetails += "</div>";

            $('.modal-title').html(galleryData[galleryId].tripName);
            $('.modal-body').html(galleryDetails);
            $("#galleryDetails").owlCarousel({
                navigation : true,
                responsive:true,
                lazyload: true,
                items:1
            });
        });
    },
    contactus: function(data){
        $('.contactus > .ownAddress > .row > .mobile').html("<i class='fa fa-mobile'></i> | +"+data.mobile);
        $('.contactus > .ownAddress > .row > .email').html("<i class='fa fa-envelope-o'></i> | "+data.email);
        $('.contactus > .ownAddress > .row > .address').html("<i class='fa fa-location-arrow'></i> | "+data.address);
    },
    bind:function(){
        // $('.close').off().on('click', function(){
        $('#myModal').on('hidden.bs.modal', function (){
            $('.modal-title').html('');
            $('.modal-body').html('');
        });
    }
};
