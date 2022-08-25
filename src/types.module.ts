export interface ITripForm {
	price?: number;
	date?: string;
	description?: string;
}

export class BaseFormTrip implements ITripForm {
	public price: number;
	public date: string;
	public description: string;

	constructor(data?: ITripForm) {
		this.price = data?.price || 0;
		this.date = data?.date || '';
		this.description = data?.description || '';
	}
}

export interface Trip {
	id: string;
	price: number;
	date: string;
	description: string;
	uid: string;
	displayName: string
}