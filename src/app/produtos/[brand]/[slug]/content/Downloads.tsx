import { TDownloadable } from '@/@types/products';
import { Download, FileDown } from 'lucide-react';

type Props = {
	data: TDownloadable[];
};

const iconClassName = 'h-6 w-6 min-w-6 text-muted-foreground';

export const Downloads = ({ data }: Props) => {
	return (
		<div className="flex py-2">
			<table className="min-w-[50%]">
				<thead>
					<tr className="text-sm">
						<th className="border p-4 font-medium">Nome</th>
						<th className="border p-4 font-medium">Tamanho do Arquivo</th>
					</tr>
				</thead>
				<tbody>
					{data.map(({ data }) => {
						if (data) {
							const { url, name, ext, size } = data.attributes;

							return (
								<tr key={data.id} className="text-sm">
									<td className="border p-4">
										<a
											className="flex items-center gap-2 underline [word-break:break-all]"
											href={url}
										>
											{ext === '.pdf' ? (
												<FileDown className={iconClassName} />
											) : (
												<Download className={iconClassName} />
											)}
											{name}
										</a>
									</td>
									<td className="border p-4 text-center text-muted-foreground">
										{(size / 1000).toFixed(2)}MB
									</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
		</div>
	);
};
