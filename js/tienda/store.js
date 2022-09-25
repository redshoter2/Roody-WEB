/** Country billing **/
let billingCountry = $("#billingCountry");

// Country endpoint.
if (billingCountry.length > 0) {
  // We are on the billing page.
  $.getJSON('https://api.craftingstore.net/v4/countries', function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      items.push( "<option value='" + key + "'>" + val + "</option>" );
    });

    billingCountry.append(items);
  });
}

/** Gift-card module **/
$('.js-card-button').click(function() {
  let card = $('#card').val();
  let storeId = $('#storeId').val();

  if (card === '') {
    return;
  }

  $.getJSON('https://api.craftingstore.net/v4/giftcards/check/' + storeId + '/' + card, function( data ) {
    let success = data.success;
    $('#card').val('');
    if (success === false) {
      $('.js-card-alert').append(
        $('<hr>')
      ).append(
        $('<div>')
          .addClass('alert')
          .addClass('alert-danger')
          .text('Card not found!')
      );

    } else {
      let amountRemaining = data.amount_remaining;
      $('.js-card-alert').append(
        $('<hr>')
      ).append(
        $('<div>')
          .addClass('alert')
          .addClass('alert-success')
          .text('Amount left on card: ' + amountRemaining)
      );
    }

    // Clear alert after 7 seconds
    setTimeout(
    function() {
      $('.js-card-alert').empty();
    }, 7000);
  });
});

$(function() {

    /* Server status module */
    const playerCountElements = $('.js-status-player-count');
    if (playerCountElements.length > 0) {

        playerCountElements.each(function(index, playerCountElement) {
            const parentElement = $(playerCountElement).parent();
            const serverStatusIp = parentElement.find('#statusServerIp').val();
            const serverStatusPort = parentElement.find('#statusServerPort').val();
            const serverStatusDisplayOffline = parentElement.find('#serverStatusHide').val();

            $.ajax({
                url: 'https://api.mcsrvstat.us/2/' + serverStatusIp +  ':' + serverStatusPort,
                success: function(data) {
                    let online = data.online;
                    let playerCurrentCount = data.players?.online;
                    let playerMaxCount = data.players?.max;

                    updateStatus(online, playerCurrentCount, playerMaxCount, playerCountElement, serverStatusDisplayOffline);
                },
                error: function() {
                    $.ajax({
                        url: 'https://mcapi.us/server/status?ip=' + serverStatusIp + '&port=' + serverStatusPort,
                        success: function(data) {
                            let online = data.online;
                            let playerCurrentCount = data.players?.now;
                            let playerMaxCount = data.players?.max;
                            updateStatus(online, playerCurrentCount, playerMaxCount, playerCountElement, serverStatusDisplayOffline);
                        }
                    });
                },
                timeout: 1000 //in milliseconds
            });
        });
    }

    function updateStatus(online, current, max, playerCountElement, serverStatusDisplayOffline) {
        const $playerCountElement = $(playerCountElement);
        const $statusModuleDiv = $playerCountElement.closest('.panel');
        const $statusStatusDiv = $statusModuleDiv.find('.js-status-status')

        if (current === undefined) {
            current = 0;
        }
        if (max === undefined) {
            max = 0;
        }

        if (online) {
            $statusStatusDiv.empty();
            $statusStatusDiv.append($('<span>').addClass('label').addClass('label-success').text('Online'))
        } else {
            if (serverStatusDisplayOffline === '0') {
                $statusModuleDiv.remove();
                return;
            }
            $statusStatusDiv.empty();
            $statusStatusDiv.append($('<span>').addClass('label').addClass('label-danger').text('Offline'))
        }
        $playerCountElement.text(current + ' / ' + max + ' players online.');
    }

    /* Avatar failover, in case one of them is down */
    const supportedProviders = {
		'cravatar.eu': 'https://cravatar.eu/helmavatar/{uuid}/100.png',
		'crafatar.com': 'https://crafatar.com/avatars/{uuid}/?size=100&overlay=true',
        'minotar.net': 'https://minotar.net/helm/{uuid}/100.png',
    };

    const images = $('img');
   
    images.each(function() {
        const element = $(this)[0];
        if (element === undefined) {
            return;
        }

        const isLoadedCorrectly = element.complete && element.naturalHeight !== 0;
        if (isLoadedCorrectly === false) {
            // Image did not load correctly
            const src = element.src;
            const splittedSrc = src.split('/');

            // Get the domain from the src
            const imageDomain = splittedSrc[2];
            if (imageDomain === undefined) {
                // No domain, strange src?
                return;
            }
            
            if (supportedProviders[imageDomain] === undefined) {
                // Not one of the avatar providers
                return;
            }

            // Fetch another provider
            const newProviderUrl = getOtherProvider(imageDomain);

            // Get the longest field from the splitted values (the UUID)
            const uuid = splittedSrc.reduce(
                function (a, b) {
                    return a.length > b.length ? a : b;
                }
            );

            element.src = newProviderUrl.replace('{uuid}', uuid);
        }
      });

    function getOtherProvider(currentProvider) {
        for (const [key, value] of Object.entries(supportedProviders)) {
            if (key !== currentProvider) {
                return value;
            }
        }
        return null;
    }
});
