import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "./style.scss"
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export class Carousel extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.items,
            active: this.props.active,
            direction: ''
        }
        this.rightClick = this.moveRight.bind(this)
        this.leftClick = this.moveLeft.bind(this)
    }

    generateItems() {
        var items = []
        var level
        console.log(this.state.active);
        for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
            var index = i
            if (i < 0) {
                index = this.state.items.length + i
            } else if (i >= this.state.items.length) {
                index = i % this.state.items.length
            }
            level = this.state.active - i
            items.push(<Item key={index} id={this.state.items[index]} level={level} />)
        }
        return items
    }
    
    moveLeft() {
        var newActive = this.state.active
        newActive--
        this.setState({
            active: newActive < 0 ? this.state.items.length - 1 : newActive,
            direction: 'left'
        })
    }
    
    moveRight() {
        var newActive = this.state.active
        this.setState({
            active: (newActive + 1) % this.state.items.length,
            direction: 'right'
        })
    }
    
    render() {
        return(
            <div id="carousel" className="noselect">
                <div className="arrow arrow-left" onClick={this.leftClick}><i class="fas fa-angle-left"></i></div>
                <ReactCSSTransitionGroup 
                    transitionName={this.state.direction}>
                    {this.generateItems()}
                </ReactCSSTransitionGroup>
                <div className="arrow arrow-right" onClick={this.rightClick}><i className="fas fa-angle-right"></i></div>
            </div>
        )
    }
}

class Item extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            level: this.props.level
        }
    }
    
    render() {
        const className = 'item level' + this.props.level;
        const image = 'url(' + this.props.id + ')';
        console.log('image: ', image);
        return(
            <div className={className}>
                <div 
                style={{
                    backgroundImage: image,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                }}
                >
                </div>
                <div className="details">
                    <div className="title">
                    <p className="nft">NFT Starving Model</p>
                    <p className="colored-header">Price</p>
                    </div>
                    <div className="values">
                    <p className="colored-header">0.01</p>
                    <p className="colored-header">0.875</p>
                    </div>
                    <div className="icons">
                    <img src="/images/diamond.png" alt="" style={{ width: "20px" }} />
                    <div className="likes">
                        <img src="/images/heart.png" alt="" />
                        <span style={{ marginLeft: "0.5em" }}>100</span>
                    </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

// var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
// ReactDOM.render(<Carousel items={items} active={0}/>, document.getElementById('root'))