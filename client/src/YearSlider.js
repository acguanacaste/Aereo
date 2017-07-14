import {
    default as React,
    Component,
} from "react";
import Slider from 'rc-slider';
const Range = Slider.Range;

class YearSlider extends Component {
    constructor(props){
        super(props);
        this.handleYearSearch = this.handleYearSearch.bind(this);
    }

    componentWillMount(){
        let row = {};
        for (let i = 0; i < this.props.dataSets.length; ++i)
            row[i] = this.props.dataSets[i];
        this.state = {
            years:this.props.dataSets,
            years2:row,
        } ;
    }
    handleYearSearch= (value) => {
        console.log(`YearSlide::handleYS: ${value}`); //eslint-disable-line
        const min = this.state.years[value[0]];
        const max = this.state.years[value[1]];
        this.setState({yearsSelected:[min,max]});
        this.props.handleYearSearch(this.state.yearsSelected);
    };

    render() {
        const wrapperStyle = { width: "100%", "paddingBottom": 25};
        const length = this.state.years.length - 1;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h4>Seleccione el año:</h4>
                        <div style={wrapperStyle}>
                            <p>Range with custom handle</p>
                            <Range
                                min={0}
                                max={length}
                                count={2}
                                step={1}
                                dots={true}
                                defaultValue={[0,length]}
                                onChange={this.handleYearSearch.bind(this)}
                                marks={this.state.years2}
                                tipFormatter={value => `${value}%`} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <button type="button" className="btn btn-primary">Buscar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default YearSlider;