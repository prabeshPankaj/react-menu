import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';


class Single extends React.Component{
    render () {
        return <li className={ "nav__list__item "+ (this.props.isSelected ? 'active' : '') }><a href="javascript:void(0)"  onClick={() => this.props.onClick()}>{this.props.title}</a></li>;
    }
}


class Menu extends React.Component {
  
    constructor(){
        super();
        this.state ={
            menus: []
        };   
    }

    componentWillMount () {
    axios.get(`http://demo6807154.mockable.io`)
      .then(res => {
        //console.log(res);
         const menus = res.data.menu.map(obj => obj);
         console.log(menus);
         this.setState({ menus });
         console.log(this.state.menus)
      });
    
    }
    
    handleClick(i) {
        const menus = this.state.menus.slice();
        menus.forEach((key,value)=>{
            if(value==i){
                key.isSelected=true;
            }else{
                key.isSelected=false;
            }
        })
        
        // const squares = this.state.menu.slice();
        // squares[i].isSelected = true;
         this.setState({menus});
    }
    render () {
        
        return  <nav className="nav nav--red">
                    <ul className="nav__list">
                    {this.state.menus.map((name, index)=>{
                        return <Single key={index} menu={name.name} title={name.title} url={name.url} isSelected={name.isSelected}
                                onClick={() => this.handleClick(index)}
                                />;
                    })}
                    </ul>
                </nav>;
    }
}

    



render(<Menu/>, document.getElementById('app'));