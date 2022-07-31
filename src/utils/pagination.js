import { URL } from 'url';
export const paginationInfo = (req, data) => {
	try {
		const {
			query: { perPage = 1, page = 1 },
			originalUrl,
			hostname,
			protocol,
			port,
		} = req;
		const { rows, count } = data;
		const totalPages = Math.max(Math.ceil(count / perPage), 1);
		const uri = new URL(
			originalUrl,
			`${protocol}://${hostname}${port ? `:${port}` : ''}`
		);

		uri.searchParams.set('page', 'PAGE_PLACEHOLDER');
		const uriTemplate = String(uri);

		uri.searchParams.set('page', 1);
		const first = String(uri);

		uri.searchParams.set('page', totalPages);
		const last = String(uri);

		const paginationInfo = {
			limit: perPage,
			currentPage: page,
			totalPages,
			totalCount: count,
			uriTemplate,
			first,
			last,
		};

		if (page < totalPages) {
			uri.searchParams.set('page', page + 1);
			paginationInfo.next = String(uri);
		}
		if (page > 1 && page <= totalPages) {
			uri.searchParams.set('page', page - 1);
			paginationInfo.prev = String(uri);
		}
		return {
			paginationInfo,
			data: rows,
		};
	} catch (err) {
		console.log(err);
		return err;
	}
};
