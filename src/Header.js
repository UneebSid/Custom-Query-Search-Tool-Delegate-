import { Segment } from "semantic-ui-react"

const Header = ({title}) => {
  return (
   
    
      <header>
          <h1> {title}</h1>
          
      </header>
 
  )
}

Header.defaultProps = 
{
    title:"My Custom Query Serach Tool"
}

export default Header
