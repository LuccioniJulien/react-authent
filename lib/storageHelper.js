class StorageHelper {
	static setItem(data,func) {
		try {
			let data = [...this.props.data]
			data.splice(value, 1)
			AsyncStorage.setItem('@MySuperStore:list', JSON.stringify({ data: data })).then(() => {
        this.props.dispatch({ type: 'QR_CLEAR_ONE', payload: { data } })
        func(true)
			})
		} catch (error) {
			func(false)
		}
	}
}

mapStateToProps = state => {
	return {
		data: state.data
	}
}

export default connect(mapStateToProps)(StorageHelper)