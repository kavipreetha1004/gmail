    google.load( 'gdata', '1.x' );
    $(function(){
      var controls = {
        login: {
          label: 'Login to google',
          action: function(){  
            google.accounts.user.login('https://www.google.com/m8/feeds');
          }
        },
        logout: {
          label: 'Logout from google',
          action: function(){
            google.accounts.user.logout();
          }
        },
        getContacts: {
          label: 'Get contacts',
          action: function(){ 
            var contactsService = new google.gdata.contacts.ContactsService( 'Contacts Viewer' ),             
                query = new google.gdata.contacts.ContactQuery( 'https://www.google.com/m8/feeds/contacts/default/full' );
            query.setMaxResults( $('#numContacts').val() );
            contactsService.getContactFeed(             
              query,             
              function( result ){             
                $('#contacts').remove();            
                var $contactsHolder = $('<ul>', {
                      id: 'contacts'
                    });           
                $.each( result.feed.entry, function( i, entry ){                 
                  $.each( entry.getEmailAddresses(), function( j, address ){
                    $contactsHolder.append( '<li>' + address.address + '</li>' );
                  });
                });
                $contactsHolder.appendTo( 'body');
              },
              function( result ){
                console.log('error: ', result);
              }
            );
          }
        }
      };
      $.each( controls, function( propertyName, control ){
        $( '<button>', {
          html: control.label,
          id: propertyName
        })
        .appendTo( 'nav' );
      });
      $( 'nav' ).delegate('button', 'click', function(){
        controls[ this.id ].action();
      })
    });