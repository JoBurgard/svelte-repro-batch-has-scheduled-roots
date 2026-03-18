import { SafePathResolver } from '$ext/ts-common-tools/utils';
import path from 'node:path';

export const pathRoot = new SafePathResolver(path.resolve(import.meta.dir, '..'));
export const pathOcrFiles = new SafePathResolver(path.resolve(pathRoot.basePath, 'volume/ocr'));
export const pathOcrTestDocs = new SafePathResolver(
	path.resolve(pathOcrFiles.basePath, 'test-documents'),
);
export const pathOcrJobs = new SafePathResolver(path.resolve(pathOcrFiles.basePath, 'jobs'));
