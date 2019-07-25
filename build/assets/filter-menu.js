function deferFilterjQuery() {
    if (window.jQuery) {
        var $ = window.jQuery;
        $(function(){
          // On load/reload
          var pt_on_load = function() {
            // Accordion
            

          	// Search
            $('.pt-display-search').not('.has_group_selected').find('input.fm-search-box').show();

          	// Drop downs
            $('.pt-display-dropdown').each(function( index ) {
                $(this).find('h4').after($(this).find('.filter-clear'));
            });

            $('.pt-display-dropdown .scroll-content').each(function( index ) {
                if($(this).find('li.selected').length) {
                    var selected = $.map(
                        $(this).find('li.selected a'),
                            function(element){
                                return $(element).text();
                            }
                      ).join(", ");

                  if (selected.length < 30) {
                    $(this).before('<div class="menu-trigger">' + selected +'</div>');
                  } else {
                     $(this).before('<div class="menu-trigger">' + $(this).find('li.selected').length + ' Selected </div>');
                  }
                }
                else {
                    $(this).before('<div class="menu-trigger">'+ $(this).closest('.filter-group').find('h4').text() +'</div>');
                }
            });

            //Sticky Mode
             // end sticky enable

          	// View more
            

            $('.filter-menu li a').attr('title', function() {
              return ($(this).closest('li').hasClass('selected') ? "Clear filter: " : "Add filter: ") + $(this).text();
            });

            // Handle nested filters
            var splitPath = function(url) {
              var splitUrl =  url.split('?')[0].split('#')[0].split('/');
              return splitUrl;
            }

            var getCollection = function(url) {
              var splitUrl = splitPath(url);
              return splitUrl[2];
            }

            var getTags = function(url) {
              var splitUrl = splitPath(url);
              return (splitUrl[3] || '').split('+');
            }

            var getCommonCollection = function(url_top, url_nested) {
              var collection_top = getCollection(url_top);
              var collection_nested = getCollection(url_nested);
              if (collection_top !== collection_nested) {
                return 'all';
              }
              return collection_top;
            }

            var getCommonTags = function(url_top, url_nested) {
              var tags_top = getTags(url_top);
              var tags_nested = getTags(url_nested);

              return tags_top.filter(function(n) {
                return tags_nested.indexOf(n) > -1;
              });
            }

            var getCommonUrl = function(url_top, url_nested) {
              var val = '/collections/' + getCommonCollection(url_top, url_nested) + '/' + getCommonTags(url_top, url_nested).join('+');

              var lastChar = val.slice(-1);
                    if (lastChar == '/') {
                    val = val.slice(0, -1);
                }

              return val;
            }

            var clearNestedParent = $('.pt-display-nested').prev().each(function() {
              var clearNested = $(this).next().find('a.filter-clear').attr('href');
              if (!clearNested) return;
              var clearLink = $(this).find('a.filter-clear');
              clearLink.attr('href', getCommonUrl(clearLink.attr('href'), clearNested))
              var filterLinks = $(this).find('li.selected .collection-name a').each(function() {
                $(this).attr('href', getCommonUrl($(this).attr('href'), clearNested))
              })
            })
          }

          pt_on_load();

          // Mobile filter button
          

          // Accordion
          

          // Search
          $(document).on('keyup', '.filter-group input.fm-search-box', function () {
            var value = this.value.toLowerCase();
            $(this).closest('.filter-group').find('li').each(function () {
              if ($(this).text().toLowerCase().search(value) > -1) {
                $(this).show(100);
              } else {
                $(this).hide(100);
              }
            });
          });

          // Drop downs
          $(document).on('click','.pt-display-dropdown .menu-trigger',function() {
            $(this).next('.scroll-content').css('top', $(this).position().top + $(this).height() + 1).css('left', $(this).position().left);
            $(this).next('.scroll-content').slideToggle('fast');
          });

          $(document).on('mouseleave', '.pt-display-dropdown .scroll-content', function() {
            $(this).slideUp('fast');
          });

          // Apply button
          

          // Ajax
          
      });
    }
    else {
        setTimeout(function() { deferFilterjQuery() }, 50);
    }
}

deferFilterjQuery();
