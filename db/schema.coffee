# Example of model definition:
#
#define 'User', ->
#  property 'email', String, index: true
#  property 'password', String
#  property 'activated', Boolean, default: false
#

Presentation = describe 'Presentation', ->
    property 'title', String
    property 'content', String
    property 'published', Boolean
    set 'restPath', pathTo.presentations

