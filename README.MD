# Loading poller client extension

This is a client extension which exports a JS Import Map Entry
to be used within a fragment (see fragments/polling-loader).

The objective of that fragment is to display a loading screen
with 3 different states (pending, success, failure)
associated with an object entry status.

The fragment has to be used on a display page template
associated to an object defintion.

What's been displayed depends on a dynamic status value
from the object entry.

The fragment will poll that value using the Liferay API
every second.

The fragment requires configuration. First, you need to
create an OAuth 2.0 client with the right scopes to
check the status of the object entry and find out
about its external reference code.

Then, you need to provide the name of the object in
the API (probably a plural, lowercase), the name
of the field to be observed and the expected value for
success and pending (anything else will be considered
a failure).

On the success page, you are probably going to display
a link to another display page template where the
resulting data will be displayed as the poller is not
going to refresh any data on the page.