load 'application'

before 'load presentation', ->
  Presentation.find params.id, (err, presentation) =>
    if err || !presentation
      if !err && !presentation && params.format == 'json'
        return send code: 404, error: 'Not found'
      redirect pathTo.presentations
    else
      @presentation = presentation
      next()
, only: ['show', 'edit', 'update', 'destroy']

action 'new', ->
  @presentation = new Presentation
  @title = 'New presentation'
  render()

action 'create', ->
  Presentation.create body.Presentation, (err, presentation) =>
    respondTo (format) =>
      format.json ->
        if err
          send code: 500, error: presentation.errors || err
        else
          send code: 200, data: presentation.toObject()
      format.html =>
        if err
          flash 'error', 'Presentation can not be created'
          @presentation = presentation
          @title = 'New presentation'
          render 'new'
        else
          flash 'info', 'Presentation created'
          redirect pathTo.presentations

action 'index', ->
  Presentation.all (err, presentations) =>
    @presentations = presentations
    @title = 'Presentation index'
    respondTo (format) ->
      format.json ->
        send code: 200, data: presentations
      format.html ->
        render presentations: presentations

action 'show', ->
  @title = 'Presentation show'
  respondTo (format) =>
    format.json =>
      send code: 200, data: @presentation
    format.html ->
      render()

action 'edit', ->
  @title = 'Presentation edit'
  respondTo (format) =>
    format.json =>
      send code: 200, data: @presentation
    format.html ->
      render()

action 'update', ->
  @presentation.updateAttributes body.Presentation, (err) =>
    respondTo (format) =>
      format.json =>
        if err
          send code: 500, error: @presentation.errors || err
        else
          send code: 200, data: @presentation
      format.html =>
        if !err
          flash 'info', 'Presentation updated'
          redirect path_to.presentation(@presentation)
        else
          flash 'error', 'Presentation can not be updated'
          @title = 'Edit presentation details'
          render 'edit'

action 'destroy', ->
  @presentation.destroy (error) ->
    respondTo (format) ->
      format.json ->
        if error
          send code: 500, error: error
        else
          send code: 200
      format.html ->
        if error
          flash 'error', 'Can not destroy presentation'
        else
          flash 'info', 'Presentation successfully removed'
        send "'" + path_to.presentations + "'"
