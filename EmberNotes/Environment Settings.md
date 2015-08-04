##locationType
possible values are history, hash, none, auto

history: uses hsitory.pushState and history.replaceState to update urls
hash: uses hashchange event and will have the # in the url.
name: does not alter the url in any way. (good for testing... maybe)
auto: defaults to history then hash if the browser does not support history

