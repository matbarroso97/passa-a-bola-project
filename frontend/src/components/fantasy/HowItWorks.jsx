import React from 'react';

const steps = [
  { number: 1, title: 'Escolha suas Jogadoras', description: 'Selecione até 11 jogadoras dentro do orçamento disponível' },
  { number: 2, title: 'Forme sua Equipe', description: 'Monte sua formação tática ideal com as jogadoras escolhidas' },
  { number: 3, title: 'Ganhe Pontos', description: 'Acumule pontos baseados no desempenho real das suas jogadoras' },
  { number: 4, title: 'Dispute Rankings', description: 'Compare sua pontuação com outros fãs e suba no ranking' },
];

export default function HowItWorks() {
  return (
    <article className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Como Funciona</h3>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
              {step.number}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}







