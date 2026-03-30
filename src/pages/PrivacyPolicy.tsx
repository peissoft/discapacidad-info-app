
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Database, Lock, UserCheck, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-health-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Política de Privacidad</h1>
          <p className="text-muted-foreground">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-6">
          {/* Introducción */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-health-600" />
                Compromiso con tu Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                La aplicación ICF Disability Assessment ha sido diseñada siguiendo los principios de 
                <strong> Privacy by Design</strong>, garantizando la máxima protección de tus datos personales 
                y de salud desde su concepción.
              </p>
            </CardContent>
          </Card>

          {/* Procesamiento Local */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-health-600" />
                Procesamiento 100% Local
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Todos los datos que introduces se procesan exclusivamente en tu navegador.</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>La información de las evaluaciones se mantiene únicamente en la memoria del navegador durante la sesión activa y no se almacena de forma persistente</li>
                <li>Los documentos PDF y Excel se generan localmente en tu dispositivo</li>
                <li>No existe ningún servidor que reciba, procese o almacene tus datos</li>
                <li>Los datos nunca abandonan tu dispositivo</li>
              </ul>
            </CardContent>
          </Card>

          {/* Sin Transmisión */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-health-600" />
                Sin Transmisión a Terceros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Tu información nunca se transmite a servidores externos.</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>No utilizamos servicios de terceros para procesar datos de salud</li>
                <li>No compartimos información con empresas externas</li>
                <li>No realizamos seguimiento ni análisis de los datos introducidos</li>
                <li>No hay cookies de seguimiento ni publicidad</li>
              </ul>
            </CardContent>
          </Card>

          {/* Derechos del Usuario */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-health-600" />
                Tus Derechos (RGPD)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                De acuerdo con el Reglamento General de Protección de Datos (RGPD), tienes los siguientes derechos:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Derecho de acceso:</strong> Puedes ver todos tus datos en cualquier momento</li>
                <li><strong>Derecho de rectificación:</strong> Puedes modificar la información introducida</li>
                <li><strong>Derecho de supresión:</strong> Puedes eliminar todos los datos borrando el almacenamiento local del navegador</li>
                <li><strong>Derecho a la portabilidad:</strong> Puedes exportar tus datos en formato PDF, Excel o CSV</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cómo Eliminar Datos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-health-600" />
                Cómo Eliminar tus Datos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Para eliminar completamente tus datos almacenados localmente:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Abre las herramientas de desarrollador de tu navegador (F12)</li>
                <li>Ve a la pestaña "Application" o "Almacenamiento"</li>
                <li>Selecciona "Local Storage" y elimina los datos de este sitio</li>
                <li>Alternativamente, borra los datos de navegación de tu navegador</li>
              </ol>
            </CardContent>
          </Card>

          {/* Limitaciones */}
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <AlertCircle className="h-5 w-5" />
                Información Importante
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-yellow-900 dark:text-yellow-100">
              <p>
                Ten en cuenta las siguientes consideraciones:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Los datos de evaluación solo existen en memoria durante la sesión activa — al cerrar la pestaña se eliminan automáticamente</li>
                <li>No existe respaldo automático de la información — exporta a PDF o Excel antes de cerrar si deseas conservarla</li>
                <li>Recomendamos exportar las evaluaciones importantes a PDF o Excel para guardarlas de forma segura</li>
              </ul>
            </CardContent>
          </Card>

          {/* Normativa Aplicable */}
          <Card>
            <CardHeader>
              <CardTitle>Normativa Aplicable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Esta aplicación cumple con los principios establecidos en:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>RGPD (Reglamento General de Protección de Datos)</strong> - Artículo 25: Protección de datos desde el diseño</li>
                <li><strong>LOPD-GDD</strong> (Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales)</li>
                <li><strong>Principio de minimización de datos</strong> - Solo recopilamos la información necesaria para la evaluación ICF</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Si tienes alguna pregunta sobre esta política de privacidad o sobre cómo se manejan tus datos, 
                puedes contactarnos a través del formulario de contacto de la aplicación.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
