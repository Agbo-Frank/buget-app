import { PropsWithChildren } from "react"

interface IModal extends PropsWithChildren {
  title: string
  id: string
  footer?: JSX.Element
}
export function Modal({ id, title, children, footer }: IModal){
  return(
    <div className="modal fade" id={id} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
          <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">{ title }</h5>
                  <button type="button" className="close waves-effect waves-light" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body">
                { children }
                  
              </div>
            
              <div className="modal-footer">
                { footer }
              </div>
          </div>
      </div>
    </div>
  )
}