import Moment from 'moment';

export function dateTemplate(rowData, column) {
    return Moment(rowData['created_at'])
            .local()
            .format("DD-MM-YYYY")
}

export function fetchLocations ()  {
    if (!this.state.locationLoaded) {
      this.setState({ locationLoading: true })
      this.loadLocation()
    }
  } 