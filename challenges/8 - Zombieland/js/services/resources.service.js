export default class ResourcesService {
	#resourcesCache = new Map();

	/**
	 * Gets a single resource
	 * @param {string} url The resource ID
	 */
	get(id) {
		if (!this.#resourcesCache.has(id)) throw new Error(`The file ${id} doesn't exist or wasn't preloaded...`);
		return this.#resourcesCache.get(id);
	}

	/**
	 * Loads a single resource or a set of resources
	 * @param {string[]} urls The resources URLs
	 */
	async load(urls) {
		for (const url of urls) await this.#load(url);
	}

	/**
	 * Loads a specific resource
	 * @param {string} url The resource URL
	 */
	#load(url) {
		const fileName = this.#getFileName(url);

		if (this.#resourcesCache.has(fileName)) return this.#resourcesCache.get(fileName);

		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				this.#resourcesCache.set(fileName, url);
				resolve(url);
			};
			img.onerror = reject;
			img.src = url;
		});
	}

	/**
	 * Gets the file name from the URL
	 * @param {string} url The resource URL
	 * @returns The filename
	 */
	#getFileName(url) {
		const splittedUrl = url.split('/');
		const fileName = splittedUrl[splittedUrl.length - 1].split('.')[0];
		return fileName;
	}
}
