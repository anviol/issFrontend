import { notFound } from 'next/navigation';

// Sem esta rota, um endereço desconhecido cai no 404 padrão do Next, fora do layout do site.
export default function Desconhecido() {
	notFound();
}
