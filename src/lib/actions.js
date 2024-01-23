'use server'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function getArticulos() {
  try {
    const { rows } = await sql`select * from articulos;`
    return rows;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}

export async function newArticulo(formData) {
  try {
    const nombre = formData.get('nombre');
    const descripcion = formData.get('descripcion');
    const precio = formData.get('precio');

    const results = await sql`
    insert into articulos(nombre,descripcion,precio) values (${nombre}, ${descripcion}, ${precio});
    `
    console.log(results);
    revalidatePath('/articulos')
  } catch (error) {
    console.log(error);
  }
  redirect('/articulos');
}


export async function editArticulo(formData) {
  const id = formData.get('id')
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const precio = formData.get('precio')

  try {
    const results = await sql` 
    update articulos set nombre=${nombre}, descripcion=${descripcion}, precio=${precio} where id = ${id};
    `
    console.log(results);
    revalidatePath('/articulos')
  } catch (error) {
    console.log(error);
  }
  redirect('/articulos');
}

export async function deleteArticulo(formData) {
  try {
    const id = formData.get('id');

    const results = await sql`delete from articulos where id = ${id};`
    console.log(results);
    revalidatePath('/articulos')
  } catch (error) {
    console.log(error);
  }

  redirect('/articulos');
}
export async function getProveedores() {
  try {
    const results = await db.query('select * from proveedores');
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function newProveedor(formData) {
  try {
    const nombre = formData.get('nombre');
    const telefono = formData.get('telefono');

    const query = 'insert into proveedores( nombre, telefono) values (?, ?)';
    const results = await db.query(query, [nombre, telefono]);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
  redirect('/proveedores');
}

export async function editProveedor(formData) {
  const id = formData.get('id');
  const nombre = formData.get('nombre');
  const telefono = formData.get('telefono');

  try {
    const query = 'update proveedores set ? where id = ?';
    const results = await db.query(query, [{ nombre, telefono }, id]);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
  redirect('/proveedores');
}

export async function deleteProveedor(formData) {
  try {
    const id = formData.get('id');
    const query = 'delete from proveedores where id = ?';
    const results = await db.query(query, [id]);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
  redirect('/proveedores');
}